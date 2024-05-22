require("dotenv").config();

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// if (!OPENAI_API_KEY) {
//   throw new Error(
//     "The OPENAI_API_KEY environment variable is missing or empty",
//   );
// }

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const tools = [
  {
    type: "function",
    function: {
      name: "get_current_jobs",
      description: "Get the current jobs",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "includes job title and location",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_user_profile",
      description: "Get user profile",
      parameters: {
        type: "object",
        properties: {
          linkedin_url: {
            type: "string",
            description: "linkedin_url",
          },
        },
        required: ["linkedin_url"],
      },
    },
  },
];

export async function newAssistant() {
  const assistant = await openai.beta.assistants.create({
    model: "gpt-3.5-turbo-0125",
    name: `jobGPT-${new Date().getTime()}`,
    instructions:
      "You are a job assistant. Help recommend the most suitable jobs for the user",
  });
  return assistant.id;
}

export async function addMessage(prompt) {
  const thread = await openai.beta.threads.create();
  openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: prompt,
  });
  return thread.id;
}

// export function runAssistant(assistantId, threadId) {
//   const encoder = new TextEncoder();
//   console.log("START ASSISTANT")
//   return new ReadableStream({
//     async start(controller) {
//       const run = openai.beta.threads.runs
//         .stream(threadId, {
//           assistant_id: assistantId,
//         })
//         .on("textCreated", (text) => process.stdout.write("\nassistant > "))
//         .on("textDelta", (textDelta, snapshot) => {
//           process.stdout.write(textDelta.value);
//           console.log("TEXT DELTA: ", textDelta.value)
//           const chunkData = encoder.encode(JSON.stringify(textDelta.value));
//           controller.enqueue(chunkData);
//         })
//         .on("toolCallCreated", (toolCall) =>
//           process.stdout.write(`\nassistant > ${toolCall.type}\n\n`),
//         )
//         .on("complete", () => {
//           console.log("END ASSISTANT")
//           controller.close();
//         });
//     },
    
//   });
// }
  // const response = new StreamingResponse(stream);
  // return response;

  // .on("toolCallDelta", (toolCallDelta, snapshot) => {
  //   if (toolCallDelta.type === "code_interpreter") {
  //     if (toolCallDelta.code_interpreter.input) {
  //       process.stdout.write(toolCallDelta.code_interpreter.input);
  //     }
  //     if (toolCallDelta.code_interpreter.outputs) {
  //       process.stdout.write("\noutput >\n");
  //       toolCallDelta.code_interpreter.outputs.forEach((output) => {
  //         if (output.type === "logs") {
  //           process.stdout.write(`\n${output.logs}\n`);
  //         }
  //       });
  //     }
  //   }
  // });

  export function runAssistant(assistantId, threadId) {
    
      const run = openai.beta.threads.runs
        .stream(threadId, {
          assistant_id: assistantId,
        })
        .on("textCreated", (text) => process.stdout.write("\nassistant > "))
        .on("textDelta", (textDelta, snapshot) => {
          process.stdout.write(textDelta.value);
          const chunkData = encoder.encode(JSON.stringify(textDelta.value));
          controller.enqueue(chunkData);
        })
        .on("toolCallCreated", (toolCall) =>
          process.stdout.write(`\nassistant > ${toolCall.type}\n\n`),
        )
        .on("complete", () => {
          console.log("END ASSISTANT")
          controller.close();
        });

  }