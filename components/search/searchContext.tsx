import { createContext, ReactNode, useState } from "react";
import { Course } from "../../types/course";

interface CourseUID extends Course {
    uid: number
}

interface SearchContextType {
    searchedCourse: CourseUID | null, 
    setSearchedCourse: (c: Course | null) => void
}

export const SearchContext = createContext<SearchContextType>({
    searchedCourse: null,
    setSearchedCourse: (_: Course | null) => {}
});

export default function CourseContextProvider({children}: {children: ReactNode}) {
    const [searchedCourse, setSearchedCourseState] = useState<CourseUID | null>(null);
    const [uid, setUID] = useState(0);
    const setSearchedCourse = (c: Course | null) => {
        setSearchedCourseState(c === null ? null :{...c, uid: uid});
        setUID((prev) => prev + 1);
    }
    return <SearchContext.Provider value={{searchedCourse, setSearchedCourse}} >
        {children}
    </SearchContext.Provider>
}