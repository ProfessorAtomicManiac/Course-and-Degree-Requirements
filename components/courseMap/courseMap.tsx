import { Background, ReactFlow } from "@xyflow/react";
import { useContext, useMemo } from "react";
import CourseNode from "./courseNode";
import { NodesContext } from "@/components/courseMap/nodesContext";
import ArrowEdge from "./ArrowEdge";

export default function CourseMap() {
    const nodeTypes = useMemo(() => ({ courseNode: CourseNode}), []);
    const edgeTypes = useMemo(() => ({ arrowEdge: ArrowEdge }), []);
    const {nodes, edges} = useContext(NodesContext);
    
    return <div className="absolute w-full h-full ">
        <ReactFlow nodeTypes={nodeTypes} edgeTypes={edgeTypes} nodes={nodes} edges={edges} fitView>
            <Background />
        </ReactFlow>
    </div>
}