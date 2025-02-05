import { type Node } from '@xyflow/react';
import { type } from 'node:os';

export type Course = {
    id: string,
    courseCode: string,
    courseName: string,
    desc: string,
    credits: number,
    requisites: string[],
    prohibited: string
};

export type CourseNode = Node<Course, 'courseNode'>;
export function CourseNode(id: string, position: {x: number, y: number}, data: Course): CourseNode {
    return {
        id: id,
        position: {
            x: position.x,
            y: position.y
        },
        data: data
    }
}

export const NUT9000: Course = {  
    id: "69420",      
    courseCode: "NUT 9000",
    courseName: "Nutritional Science Grad Thesis",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum consequuntur maiores reiciendis est enim natus ut iusto nulla, earum recusandae labore pariatur facere quaerat sint ea ullam cum, magni ratione!",
    credits: 69,
    requisites: [],
    prohibited: ""
}

/* example node
{
    id: 'a',
    data: {
        label: 'A',
        // we need unique ids for the handles (called 'ports' in elkjs) for the layouting
        // an id is structured like: nodeid-source/target-id
        sourceHandles: [{ id: 'a-s-a' }, { id: 'a-s-b' }, { id: 'a-s-c' }],
        targetHandles: [],
    },
    position: { x: 0, y: 0 },
    type: 'elk',
}
*/