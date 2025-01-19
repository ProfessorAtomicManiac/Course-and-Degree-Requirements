"use client"

import { getCourse } from "@/lib/service";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({onSearch}: {onSearch: (course: string) => void}) {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    return <div className="w-11/12 p-2 my-4 mx-auto rounded-full bg-slate-50 shadow-md flex items-center">
        <input
            type="text"
            placeholder="Enter course here" 
            onChange={(event) => {
                setIsFocused(false);
                setInput(event.target.value);
            }} 
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`border-none m-2 bg-slate-50 flex-1 ${isFocused ? "outline" : "outline-none"}`}
        />
        <button 
            type="button" 
            className="mr-1 p-2 h-fit rounded-full aspect-square hover:bg-slate-200"
            onClick={() => {
                console.log(input);
               onSearch(input);
            }}
        >
            <FaSearch size="15" className="w-min"/>
        </button>
    </div>
}