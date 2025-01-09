import React from 'react';
import { Background, ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import SearchBar from '@/components/searchbar';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function App() {
  return (
    <div className="relative w-full">
      <div className="absolute w-full h-full">
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background />
          <SearchBar/>  
        </ReactFlow>
      </div>
    </div>
  );
}