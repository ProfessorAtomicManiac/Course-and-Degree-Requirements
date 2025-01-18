import { Handle, Position } from "@xyflow/react"
import { useState } from "react"
import Course from './course.ts'

export default function CourseNode({ data }: { data: Course }) {

    const [hasTaken, setHasTaken] = useState(false);
    function handleClick() {
        setHasTaken(!hasTaken);
    }
    console.log(data.courseCode);

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