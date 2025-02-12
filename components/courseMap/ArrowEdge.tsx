import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath, MarkerType } from '@xyflow/react';

export default function ArrowEdge({
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style
  }: EdgeProps) {
    const edgePathParams = {
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      };
      console.log(markerEnd);
    const [path] = getBezierPath(edgePathParams);
    return <BaseEdge style={style} path={path} markerEnd={markerEnd} />;
  }