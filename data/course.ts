import { Course } from '@/components/courseMap/courseNode';

const CS200: Course = {  
    id: "CS200",      
    courseCode: "CS 200",
    courseName: "PROGRAMMING I",
    desc: "Learn the process of incrementally developing small (200-500 lines) programs along with the fundamental Computer Science topics. These topics include: problem abstraction and decomposition, the edit-compile-run cycle, using variables of primitive and more complex data types, conditional and loop-based flow control, basic testing and debugging techniques, how to define and call functions (methods), and IO processing techniques. Also teaches and reinforces good programming practices including the use of a consistent style, and meaningful documentation. Intended for students who have no prior programming experience.",
    credits: 3,
    requisites: [],
    prohibited: ""
}

const CS300: Course = {  
    id: "CS300",      
    courseCode: "CS 300",
    courseName: "PROGRAMMING II",
    desc: "Introduction to Object-Oriented Programming using classes and objects to solve more complex problems. Introduces array-based and linked data structures: including lists, stacks, and queues. Programming assignments require writing and developing multi-class (file) programs using interfaces, generics, and exception handling to solve challenging real world problems. Topics reviewed include reading/writing data and objects from/to files and exception handling, and command line arguments. Topics introduced: object-oriented design; class vs. object; create and define interfaces and iterators; searching and sorting; abstract data types (List,Stack,Queue,PriorityQueue(Heap),Binary Search Tree); generic interfaces (parametric polymorphism); how to design and write test methods and classes; array based vs. linked node implementations; introduction to complexity analysis; recursion.",
    credits: 3,
    requisites: ["CS200"],
    prohibited: ""
}

const CS400: Course = {  
    id: "CS400",      
    courseCode: "CS 400",
    courseName: "PROGRAMMING III",
    desc: "The third course in our programming fundamentals sequence. It presumes that students understand and use functional and object-oriented design and abstract data types as needed. This course introduces balanced search trees, graphs, graph traversal algorithms, hash tables and sets, and complexity analysis and about classes of problems that require each data type. Students are required to design and implement using high quality professional code, a medium sized program, that demonstrates knowledge and use of latest language features, tools, and conventions. Additional topics introduced will include as needed for projects: inheritance and polymorphism; anonymous inner classes, lambda functions, performance analysis to discover and optimize critical code blocks. Students learn about industry standards for code development. Students will design and implement a medium size project with a more advanced user-interface design, such as a web or mobile application with a GUI and event- driven implementation; use of version-control software.",
    credits: 3,
    requisites: ["CS300"],
    prohibited: ""
}

const CS252: Course = {
    id: "CS252",
    courseCode: "CS 252",
    courseName: "INTRODUCTION TO COMPUTER ENGINEERING",
    desc: "Logic components built with transistors, rudimentary Boolean algebra, basic combinational logic design, basic synchronous sequential logic design, basic computer organization and design, introductory machine- and assembly-language programming.",
    credits: 3,
    requisites: [],
    prohibited: ""
}

const CS354: Course = {
    id: "CS354",
    courseCode: "CS 354",
    courseName: "MACHINE ORGANIZATION AND PROGRAMMING",
    desc: "An introduction to fundamental structures of computer systems and the C programming language with a focus on the low-level interrelationships and impacts on performance. Topics include the virtual address space and virtual memory, the heap and dynamic memory management, the memory hierarchy and caching, assembly language and the stack, communication and interrupts/signals, compiling and assemblers/linkers.",
    credits: 3,
    requisites: ["CS252"],
    prohibited: ""
}

const CS537: Course = {
    id: "CS537",
    courseCode: "CS 537",
    courseName: "INTRODUCTION TO OPERATING SYSTEMS",
    desc: "Input-output hardware, interrupt handling, properties of magnetic tapes, discs and drums, associative memories and virtual address translation techniques. Batch processing, time sharing and real-time systems, scheduling resource allocation, modular software systems, performance measurement and system evaluation.",
    credits: 4,
    requisites: ["CS354", "CS400"],
    prohibited: ""
}

const MATH221: Course = {
    id: "MATH221",
    courseCode: "MATH 221",
    courseName: "Calculus and Analytic Geometry 1",
    desc: "Introduction to differential and integral calculus and plane analytic geometry; applications; transcendental functions.",
    credits: 5,
    requisites: [],
    prohibited: ""
}
const MATH222: Course = {
    id: "MATH222",
    courseCode: "MATH 222",
    courseName: "Calculus and Analytic Geometry 2",
    desc: "Techniques of integration, improper integrals, first order ordinary differential equations, sequences and series, Taylor series, vector geometry in two and three dimensions.",
    credits: 4,
    requisites: ["MATH221"],
    prohibited: ""
}

const CS240: Course = {
    id: "CS240",
    courseCode: "CS 240",
    courseName: "Introduction to Discrete Mathematics",
    desc: "Basic concepts of logic, sets, partial order and other relations, and functions. Basic concepts of mathematics (definitions, proofs, sets, functions, and relations) with a focus on discrete structures: integers, bits, strings, trees, and graphs. Propositional logic, Boolean algebra, and predicate logic. Mathematical induction and recursion. Invariants and algorithmic correctness. Recurrences and asymptotic growth analysis. Fundamentals of counting.",
    credits: 3,
    requisites: ["MATH222"],
    prohibited: ""
}

const CS577: Course = {
    id: "CS577",
    courseCode: "CS 577",
    courseName: "INTRODUCTION TO ALGORITHMS",
    desc: "Basic paradigms for the design and analysis of efficient algorithms: greed, divide-and-conquer, dynamic programming, reductions, and the use of randomness. Computational intractability including typical NP-complete problems and ways to deal with them.",
    credits: 4,
    requisites: ["CS240", "CS400"],
    prohibited: ""
}

export const testCourses = [CS200, CS300, CS400, CS252, CS354, MATH221, MATH222, CS240, CS577];