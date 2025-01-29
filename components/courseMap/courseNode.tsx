import { Handle, Position } from "@xyflow/react"
import { useContext, useState } from "react"
import Course, { NUT9000 } from '../../types/course.ts'
import { SearchContext } from "../search/searchContext.tsx";

export default function CourseNode({ data }: { data: Course }) {

    const [hasTaken, _] = useState(false);
    const {setSearchedCourse} = useContext(SearchContext);
    function handleClick() {
        setSearchedCourse(NUT9000);
        //setHasTaken(!hasTaken);
    }

    return(
        <div className={"h-8 w-32 border-2 border-gray-500 rounded-full flex justify-center items-center cursor-pointer " + (hasTaken ? "bg-green-400" : "bg-red-400")} onClick={handleClick}>
            <Handle type="target" position={Position.Top}/>
            <div>
                <span>{data.courseCode}</span>
            </div>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    )
}