import Course from './course.ts'

export default function SearchExpand({course}: {course: Course}) {
    return <section className="w-full h-screen bg-slate-50 m-0">
        <h1>{course.courseCode}</h1>
        <h3>{course.courseName}</h3>
        <h5>Description</h5>
        <p>{course.desc}</p>
        <h5>Requisites</h5>
        <p>{course.requisites}</p>
        <p>Cannot take if taken {course.prohibited}</p>
        <p>Credits: {course.credits}</p>
    </section>
}