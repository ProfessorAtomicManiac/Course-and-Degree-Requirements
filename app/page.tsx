"use client"

import React from 'react';
 
import '@xyflow/react/dist/style.css';
import SearchComponent from '@/components/search/searchComp';
import CourseContextProvider from '@/components/search/searchContext';
import NodesContextProvider from '@/components/courseMap/nodesContext';
import CourseMap from '@/components/courseMap/courseMap';

export default function App() {
  
  return (
      <NodesContextProvider>
        <CourseContextProvider>
        <div className="relative w-full">
          <CourseMap />
          
            <SearchComponent />
        </div>
        </CourseContextProvider>
      </NodesContextProvider>
    
  );
}