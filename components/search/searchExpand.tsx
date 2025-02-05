import { Course } from '../courseMap/courseNode.tsx'

export default function SearchExpand({course}: {course: Course}) {
    return <section className="w-full h-screen m-0 p-2 flex flex-col gap-4 overflow-auto">
        <div>
            <h1 className="text-xl font-bold">{course.courseCode}</h1>
            <h3 className="text-slate-500">{course.courseName}</h3>
        </div>
        <div>
            <h5 className="text-lg">Description</h5>
            <p>{course.desc}</p>
        </div>
        <div>
            <h5 className="text-lg">Requisites</h5>
            <p>{course.requisites}</p>
            <p>Cannot take if taken {course.prohibited}</p>
        </div>
        <div>
            <p>Credits: {course.credits}</p>
        </div>
    </section>
}