import { useEffect, useState } from "react";
import Course from "./course";
import SearchBar from "./searchbar";
import SearchExpand from "./searchExpand";
const testCourse = {
  id: 0,
  courseCode: "NUT 9000",
  courseName: "Nutritional Science Graduate Studies",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quo eligendi saepe asperiores quaerat debitis at vitae optio numquam impedit, iure rem harum, quidem similique obcaecati labore! Nisi, voluptas quo?",
  credits: 69,
  requisites: ["NUT 100"],
  prohibited: []
}
export default function SearchComponent({onSearch}: {onSearch: (course: string) => void}) {
    const [targetCourse, setTargetCourse] = useState<Course | null>(null);
    console.log(targetCourse !== null);
    useEffect(() => {
        // testing - remove
        setTargetCourse(testCourse);
    }, []);
    return targetCourse !== null ? <section className="absolute w-1/3 h-screen bg-background border-r shadow-lg">
        <SearchBar onSearch={onSearch}/>
        <SearchExpand course={targetCourse}/>)</section> : 
        <div className="absolute w-1/3">
            <SearchBar onSearch={onSearch}/>
        </div>
}