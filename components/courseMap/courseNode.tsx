import { Handle, Position, type Node } from "@xyflow/react"
import { useContext, useState } from "react"
import { SearchContext } from "../search/searchContext.tsx";

export type Course = {
    id: string;
    courseCode: string;
    courseName: string;
    desc: string;
    credits: number;
    requisites: string[];
    prohibited: string;
};
export type CourseNodeParams = Node<Course, 'courseNode'>;
export function CourseNodeParams(id: string, position: {x: number, y: number}, data: Course): CourseNodeParams {
    return {
        id: id,
        type: 'courseNode',
        position: {
            x: position.x,
            y: position.y
        },
        data: data
    }
}

// implement NodeProps<CourseNode> to handle "handles", "edges", "labels", etc
export default function CourseNode({ data }: { data: Course }) {

    const [hasTaken, _] = useState(false);
    const {setSearchedCourse} = useContext(SearchContext);
    function handleClick() {
        setSearchedCourse(data);
        //setHasTaken(!hasTaken);
    }

    return(
        <div className={"h-8 w-32 border-2 border-gray-500 rounded-full flex justify-center items-center cursor-pointer " + (hasTaken ? "bg-green-400" : "bg-red-400")} onClick={handleClick}>
            <Handle type="target" position={Position.Left}/>
            <div>
                <span>{data.courseCode}</span>
            </div>
            <Handle type="source" position={Position.Right}/>
        </div>
    )
}
