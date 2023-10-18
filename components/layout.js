import Nav from "@/components/nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import Logo from "./logo"
export default function Layout({ children }) {
  const [showNav,setShowNav] = useState(false)
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="w-screen h-screen text-center flex items-center justify-center bg-black">
        <div className="text-center">
          <button onClick={() => signIn('google')} className=" text-white p-4 px-4 rounded-md border font-bold gap-2 flex border  ">
            <svg xmlns="https://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48" aria-hidden="true" class="L5wZDc"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path><path fill="none" d="M2 2h44v44H2z"></path></svg>
            Login with Google
          </button>
        </div>
      </div>

    )
  }

  return (
    <div className="bg-gray-200 min-h-screen "  >
      <div className="block md:hidden flex ">
        <button onClick={() => setShowNav(true)} className="p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-8">
        <Logo/>
        </div>
      </div>
      <div className="flex">
        <Nav show ={showNav}></Nav>
        <div className="bg-gray-200 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
      </div>
    </div>
  )
}
