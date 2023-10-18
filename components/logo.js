import Image from "next/image"

export default function Logo(){
    return(
    <a className="flex">
        <Image src="/Gizmo.png" alt="The Gizmo" width="100" height="50" className="" ></Image>
    </a>
    )
}