import { useContext, useEffect, useState } from "react";
import Course from "../../types/course";
import SearchBar from "./searchbar";
import SearchExpand from "./searchExpand";
import { SearchContext } from "./searchContext";
const testCourse = {
  id: 0,
  courseCode: "NUT 9000",
  courseName: "Nutritional Science Graduate Studies",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quo eligendi saepe asperiores quaerat debitis at vitae optio numquam impedit, iure rem harum, quidem similique obcaecati labore! Nisi, voluptas quo?",
  credits: 69,
  requisites: ["NUT 100"],
  prohibited: []
}
export default function SearchComponent() {

    const {searchedCourse, setSearchedCourse} = useContext(SearchContext);
    // useEffect(() => {
    //     // testing - remove
    //     setTargetCourse(testCourse);
    // }, []);
    return searchedCourse !== null ? <section className="absolute w-1/3 h-screen bg-background border-r shadow-lg">
        <SearchBar />
        <SearchExpand course={searchedCourse}/></section> : 
        <div className="absolute w-1/3">
            <SearchBar />
        </div>
}