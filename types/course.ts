export default interface Course {
    id: number,
    courseCode: string,
    courseName: string,
    desc: string,
    credits: number,
    requisites: string[],
    prohibited: string[]
}