import { createContext, ReactNode, useState } from "react";
import { Course, CourseNode } from "../../types/course";
import { Edge, type Node } from '@xyflow/react';

export interface NodesContextType {
    nodes: Node[], 
    edges: Edge[],
    addCourse: (c: Course) => void,
    addEdge: () => void
}

export const NodesContext = createContext<NodesContextType>({
    nodes: [],
    edges: [],
    addCourse: (_: Course) => {},
    addEdge: () => {}
});

/*
const initialNodes = [
  { id: '0', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '1', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
*/
const width = 128; // px
const height = 32; // px

export default function NodesContextProvider({children}: {children: ReactNode}) {
    const [nodes, setNodes] = useState<CourseNode[]>([]);
    const [edges, _] = useState<Edge[]>([]);

    const ELK = require('elkjs')
    const elk = new ELK()
  
    const graph = {
      id: "root",
      layoutOptions: { 'elk.algorithm': 'layered' },
      children: nodes.map((node) => {
        return {
          id: node.id,
          width: width,
          height: height
        }
      }),
      edges: nodes.map((node) => {
        return {
          ...[(node.data).requisitesId.map((requisiteId) => {
            return {
              id: `${node.data.id}-${requisiteId}`,
              sources: [node.data.id],
              targets: [requisiteId]
            }
          })]
        }
      })
    }
    
    async function loadLayout() {
      const bruh = await elk.layout(graph)
       .then(console.log)
       .catch(console.error)
    }

    function addCourse(course: Course) {
        const newNode = CourseNode(nodes.length.toString(), {x: 0, y: 0}, course);
        setNodes((nds) => [...nds, newNode]);
        loadLayout();
      }

    function addEdge() {
        console.log("Adding Edges not implemented");
    }

    return <NodesContext.Provider value={{nodes, edges, addCourse: addCourse, addEdge}} >
        {children}
    </NodesContext.Provider>
}
