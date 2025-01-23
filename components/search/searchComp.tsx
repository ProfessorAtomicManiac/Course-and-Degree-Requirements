import { useContext } from "react";
import SearchBar from "./searchbar";
import SearchExpand from "./searchExpand";
import { SearchContext } from "./searchContext";

export default function SearchComponent() {

    const {searchedCourse} = useContext(SearchContext);
    return searchedCourse !== null ? 
        <section className="box-content absolute w-1/3 h-screen bg-background border-r shadow-lg flex flex-col">
          <SearchBar />
          <SearchExpand course={searchedCourse}/>
        </section> 
        : <section className="box-content absolute w-1/3">
            <SearchBar />
        </section>
}