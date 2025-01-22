import { Background, ReactFlow } from "@xyflow/react";
import { useContext, useMemo } from "react";
import CourseNode from "./courseNode";
import { NodesContext, NodesContextType } from "@/components/courseMap/nodesContext";

export default function CourseMap() {
    const nodeTypes = useMemo(() => ({ courseNode: CourseNode}), []);
    const {nodes, edges} = useContext(NodesContext);
    
    return <div className="absolute w-full h-full ">
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
            <Background />
        </ReactFlow>
    </div>
}