"use client"

import React, { useCallback, useMemo, useState } from 'react';
import { Background, ReactFlow, type Node, type Edge, Panel } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import SearchBar from '@/components/searchbar';
import { getCourse } from '@/lib/service';
import CourseNode from '@/components/courseNode';
import SearchExpand from '@/components/searchExpand';
import SearchComponent from '@/components/searchComp';


const initialNodes = [
  { id: '0', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '1', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];



export default function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const nodeTypes = useMemo(() => ({ courseNode: CourseNode}), []);
 
  async function handleSearch(course: string) {
    const newNode = {
      id: nodes.length.toString(),
      type: 'courseNode',
      position: { x: 0, y: 100 * nodes.length},
      data: {        
        courseCode: course,
        courseName: course,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum consequuntur maiores reiciendis est enim natus ut iusto nulla, earum recusandae labore pariatur facere quaerat sint ea ullam cum, magni ratione!",
        credits: 69,
        requisites: [],
        prohibited: []
      }
    }
    setNodes((nds) => [...nds, newNode]);
  }
  console.log(nodes);

  return (
    <div className="relative w-full">
      <div className="absolute w-full h-full ">
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
          <Background />
        </ReactFlow>

      </div>
      <SearchComponent onSearch={handleSearch}/>

    </div>
  );
}