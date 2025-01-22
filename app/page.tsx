"use client"

import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Background, ReactFlow, type Node, type Edge, Panel } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import SearchBar from '@/components/search/searchbar';
import { getCourse } from '@/lib/service';
import CourseNode from '@/components/courseMap/courseNode';
import SearchExpand from '@/components/search/searchExpand';
import SearchComponent from '@/components/search/searchComp';
import CourseContextProvider from '@/components/search/searchContext';
import NodesContextProvider, { NodesContext } from '@/components/courseMap/nodesContext';
import CourseMap from '@/components/courseMap/courseMap';

export default function App() {
  
  return (
      <NodesContextProvider>
        <div className="relative w-full">
          <CourseMap />
          <CourseContextProvider>
            <SearchComponent />
          </CourseContextProvider>
        </div>
      </NodesContextProvider>
    
  );
}