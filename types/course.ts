export default interface Course {
    id: number,
    courseCode: string,
    courseName: string,
    desc: string,
    credits: number,
    requisites: string[],
    prohibited: string[]
}

export const NUT9000: Course = {  
    id: 69420,      
            courseCode: "NUT 9000",
            courseName: "Nutritional Science Grad Thesis",
            desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum consequuntur maiores reiciendis est enim natus ut iusto nulla, earum recusandae labore pariatur facere quaerat sint ea ullam cum, magni ratione!",
            credits: 69,
            requisites: [],
            prohibited: []
          }