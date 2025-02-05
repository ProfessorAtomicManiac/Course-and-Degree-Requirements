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

export const CS200: Course = {  
    id: "CS200",      
    courseCode: "CS 200",
    courseName: "PROGRAMMING I",
    desc: "Learn the process of incrementally developing small (200-500 lines) programs along with the fundamental Computer Science topics. These topics include: problem abstraction and decomposition, the edit-compile-run cycle, using variables of primitive and more complex data types, conditional and loop-based flow control, basic testing and debugging techniques, how to define and call functions (methods), and IO processing techniques. Also teaches and reinforces good programming practices including the use of a consistent style, and meaningful documentation. Intended for students who have no prior programming experience.",
    credits: 3,
    requisites: [],
    prohibited: ""
}

export const CS300: Course = {  
    id: "CS300",      
    courseCode: "CS 300",
    courseName: "PROGRAMMING II",
    desc: "Introduction to Object-Oriented Programming using classes and objects to solve more complex problems. Introduces array-based and linked data structures: including lists, stacks, and queues. Programming assignments require writing and developing multi-class (file) programs using interfaces, generics, and exception handling to solve challenging real world problems. Topics reviewed include reading/writing data and objects from/to files and exception handling, and command line arguments. Topics introduced: object-oriented design; class vs. object; create and define interfaces and iterators; searching and sorting; abstract data types (List,Stack,Queue,PriorityQueue(Heap),Binary Search Tree); generic interfaces (parametric polymorphism); how to design and write test methods and classes; array based vs. linked node implementations; introduction to complexity analysis; recursion.",
    credits: 3,
    requisites: ["CS200"],
    prohibited: ""
}

export const CS400: Course = {  
    id: "CS400",      
    courseCode: "CS 400",
    courseName: "PROGRAMMING III",
    desc: "The third course in our programming fundamentals sequence. It presumes that students understand and use functional and object-oriented design and abstract data types as needed. This course introduces balanced search trees, graphs, graph traversal algorithms, hash tables and sets, and complexity analysis and about classes of problems that require each data type. Students are required to design and implement using high quality professional code, a medium sized program, that demonstrates knowledge and use of latest language features, tools, and conventions. Additional topics introduced will include as needed for projects: inheritance and polymorphism; anonymous inner classes, lambda functions, performance analysis to discover and optimize critical code blocks. Students learn about industry standards for code development. Students will design and implement a medium size project with a more advanced user-interface design, such as a web or mobile application with a GUI and event- driven implementation; use of version-control software.",
    credits: 3,
    requisites: ["CS300"],
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