import { createContext, ReactNode, useState } from "react";
import Course from "../../types/course";
import { Edge, type Node } from '@xyflow/react';

export interface NodesContextType {
    nodes: Node[], 
    edges: Edge[],
    addNode: (c: Course) => void,
    addEdge: () => void
}

export const NodesContext = createContext<NodesContextType>({
    nodes: [],
    edges: [],
    addNode: (_: Course) => {},
    addEdge: () => {}
});

/*
const initialNodes = [
  { id: '0', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '1', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
*/

export default function NodesContextProvider({children}: {children: ReactNode}) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, _] = useState<Edge[]>([]);

    function addNode(course: Course) {
        const newNode = {
          id: nodes.length.toString(),
          type: 'courseNode',
          position: { x: 0, y: 100 * nodes.length},
          data: {...course}
        }
        setNodes((nds) => [...nds, newNode]);
      }

    function addEdge() {
        console.log("Adding Edges not implemented");
    }

    return <NodesContext.Provider value={{nodes, edges, addNode, addEdge}} >
        {children}
    </NodesContext.Provider>
}
