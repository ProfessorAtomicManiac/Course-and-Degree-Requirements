import { createContext, ReactNode, SetStateAction, useState } from "react";
import Course from "../../types/course";

interface SearchContextType {
    searchedCourse: Course | null, 
    setSearchedCourse: (c: Course | null) => void
}

export const SearchContext = createContext<SearchContextType>({
    searchedCourse: null,
    setSearchedCourse: (c: Course | null) => {}
});

export default function CourseContextProvider({children}: {children: ReactNode}) {
    const [searchedCourse, setSearchedCourse] = useState<Course | null>(null);

    return <SearchContext.Provider value={{searchedCourse, setSearchedCourse}} >
        {children}
    </SearchContext.Provider>
}