"use client"

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    const [input, setInput] = useState("");

    return <div className="w-1/3 m-4 p-2 rounded-full shadow-md flex bg-slate-50">
        <input onChange={(event) => setInput(event.target.value)} className="border-none bg-slate-50 flex-1"/>
        <button type="button">
            <FaSearch size="20" className="w-min"/>
        </button>
    </div>
}