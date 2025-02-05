import { createContext, ReactNode, useEffect, useState } from "react";
import { CS200, CS300, CS400 } from "../../types/course";
import { Course, CourseNodeParams } from './courseNode';
import { Edge, type Node } from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js'

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
    const [nodes, setNodes] = useState<CourseNodeParams[]>([
      CourseNodeParams(CS200.id, {x: 0, y: 0}, CS200),
      CourseNodeParams(CS300.id, {x: 0, y: 0}, CS300),
      CourseNodeParams(CS400.id, {x: 0, y: 0}, CS400),
    ]);
    const [edges, _] = useState<Edge[]>([]);
    const elk = new ELK()

    let edgesELK = [];
    for (let i = 0; i < nodes.length; i++) {
      const requisiteIds = (nodes[i].data).requisites
      for (let requisiteId of requisiteIds) {
        edgesELK.push({
          id: `${requisiteId}-${nodes[i].data.id}`,
                  sources: [requisiteId],
                  targets: [nodes[i].data.id]
        })
      }
    }
  
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
      edges: edgesELK
    }
    useEffect(() => {
      loadLayout()
    }, []);
    
    
    async function loadLayout() {
      const layout = await elk.layout(graph);
      //  .then(console.log)
      //  .catch(console.error);
      /*
const initialNodes = [
  { id: '0', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '1', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
*/
      let newNodes = [];
      for (let i = 0; i < nodes.length; i++) {
        const x = layout.children![i].x;
        const y = layout.children![i].y;
        newNodes.push(
          CourseNodeParams(nodes[i].id, {x: x!, y: y!}, nodes[i].data)
        );
      }
      setNodes(newNodes);
      console.log(newNodes);
    }

    function addCourse(course: Course) {
        const newNode = CourseNodeParams(nodes.length.toString(), {x: 0, y: 0}, course);
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
