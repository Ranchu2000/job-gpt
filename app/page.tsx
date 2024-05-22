import Link from "next/link";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center text-xl font-extrabold">
      <Link href="/chat">Click Here</Link>
    </div>
  );
};

export default Home;
