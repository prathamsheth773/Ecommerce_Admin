import Nav from "@/components/nav"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Layout({children}) {
  const { data: session } = useSession()
  if(!session)
  {
    return (
      <div className="bg-green-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')}className="bg-black text-white p-4 px-4 rounded-md font-bold">Login with Google</button>
        </div>
      </div>
  
    )
  }

  return(
    <div className="bg-green-900 min-h-screen flex">
      <Nav></Nav>
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
    </div>
  )
}
