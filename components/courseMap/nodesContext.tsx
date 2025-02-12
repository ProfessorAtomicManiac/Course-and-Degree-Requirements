import { createContext, ReactNode, useEffect, useState } from "react";
import { testCourses } from "../../data/course";
import { Course, CourseNodeParams, EdgeParams } from './courseNode';
import { Edge, type Node } from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js'

export interface NodesContextType {
    nodes: Node[], 
    edges: Edge[],
    addCourse: (c: Course) => void,
}

export const NodesContext = createContext<NodesContextType>({
    nodes: [],
    edges: [],
    addCourse: (_: Course) => {},
});

const width = 128; // px
const height = 32; // px
const paddingX = 100;
const paddingY = 50;

export default function NodesContextProvider({children}: {children: ReactNode}) {
    const [nodes, setNodes] = useState<CourseNodeParams[]>(
      testCourses.map((course) => CourseNodeParams(course.id, {x: 0, y: 0}, course)
    ));

    const [edges, setEdges] = useState<Edge[]>([]);
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
          width: width + paddingX,
          height: height + paddingY
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
 
      let newNodes = [];
      for (let i = 0; i < nodes.length; i++) {
        const x = layout.children![i].x;
        const y = layout.children![i].y;
        newNodes.push(
          CourseNodeParams(nodes[i].id, {x: x!, y: y!}, nodes[i].data)
        );
      }
      setNodes(newNodes);
      let newEdges = [];
      for (let i = 0; i < layout.edges!.length; i++) {
        newEdges.push(EdgeParams({id: layout.edges![i].id, source: layout.edges![i].sources[0], target: layout.edges![i].targets[0]}));
      }
      setEdges(newEdges);
      console.log(newNodes);
    }

    function addCourse(course: Course) {
      const newNode = CourseNodeParams(nodes.length.toString(), {x: 0, y: 0}, course);
      setNodes((nds) => [...nds, newNode]);
      loadLayout();
    }

    return <NodesContext.Provider value={{nodes, edges, addCourse: addCourse}} >
        {children}
    </NodesContext.Provider>
}
