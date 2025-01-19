import { ReactNode } from "react";
import { MdOutlineFileUpload, MdHistory } from "react-icons/md";

function IconButton({icon, label}: {icon: ReactNode, label: string}) {
    return <button className="w-min p-1 my-2 text-xs rounded-md flex flex-col justify-center items-center">
        {icon}
        <label className="cursor-pointer">{label}</label>
    </button>
}

export default function NavBar() {
    return <nav className="z-50 sticky top-0 left-0 h-screen w-16 m-0 border-r shadow-lg bg-background flex flex-col items-center">
        <IconButton icon={<MdOutlineFileUpload size="25"/>} label="DARS"/>
        <IconButton icon={<MdHistory size="25"/>} label="Recents"/>
    </nav>
}