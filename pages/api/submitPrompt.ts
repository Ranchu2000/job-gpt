import { NextApiRequest, NextApiResponse } from 'next';
import { addMessage, newAssistant, runAssistant } from './openAI';
require("dotenv").config();
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { assistantId, prompt } = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();


    let threadId= await addMessage(prompt)
    const run = openai.beta.threads.runs
    .stream(threadId, { assistant_id: assistantId })
    .on("textCreated", (text) => process.stdout.write(`data: \nassistant > \n\n`))
    .on("textDelta", (delta,snapshot) => {res.write(`${delta.value}`); console.log(delta.value)})
    .on(("end"), () => res.end())

  } else if(req.method=="GET"){
    const assistantId = await newAssistant()
    console.log(assistantId)
    res.status(200).json({ assistantId });
  }
  
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
