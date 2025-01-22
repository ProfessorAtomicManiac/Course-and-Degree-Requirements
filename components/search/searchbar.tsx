"use client"

import { getCourse } from "@/lib/service";
import { useContext, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NodesContext } from "../courseMap/nodesContext";
import Course, { NUT9000 } from "@/types/course";
import { SearchContext } from "./searchContext";




export default function SearchBar() {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    // remove the nodes id thingy, its for testing
    const {nodes, addNode} = useContext(NodesContext);
    const {searchedCourse, setSearchedCourse} = useContext(SearchContext);
      
    function handleSearch(input: string) {
        if (input.length === 0) {
            setSearchedCourse(null);
        } else {
            addNode(NUT9000);
            setSearchedCourse(NUT9000);
        }
    }

    // i feel like there is a better way to do this
    useEffect(() => {
        console.log("Bruh");
        setInput(searchedCourse === null ? "" : searchedCourse.courseCode);
    }, [searchedCourse])

    console.log(searchedCourse?.courseCode);
    return <div className="w-11/12 p-2 my-4 mx-auto rounded-full bg-slate-50 shadow-md flex items-center">
        <input
                type="text"
                placeholder="Enter course here" 
                onChange={(event) => {
                    setIsFocused(false);
                    setInput(event.target.value);
                }}
                value={input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`border-none m-2 bg-slate-50 flex-1 ${isFocused ? "outline" : "outline-none"}`}
            />
        <button 
            type="button" 
            className="mr-1 p-2 h-fit rounded-full aspect-square hover:bg-slate-200"
            onClick={(_) => {
                handleSearch(input);
            }}
        >
            <FaSearch size="15" className="w-min"/>
        </button>
    </div>
}