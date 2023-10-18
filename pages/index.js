import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return <Layout>
    <div className="text-black flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-orange-200 text-justify font-bold text-primary gap-1 rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="User name" className="w-8 h-8" />
          <span className="px-2 py-0.5">
            {session?.user?.name}
          </span>
      </div>
    </div>
  </Layout>
}