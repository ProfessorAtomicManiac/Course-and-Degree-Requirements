import { useContext } from "react";
import SearchBar from "./searchbar";
import SearchExpand from "./searchExpand";
import { SearchContext } from "./searchContext";
import { VscTriangleLeft } from "react-icons/vsc";

export default function SearchComponent() {

    const {searchedCourse} = useContext(SearchContext);
    return searchedCourse !== null ? 
          <section className="animate-slide box-content absolute w-1/3 h-screen bg-background border-r shadow-lg flex flex-col">
            <SearchBar />
            <SearchExpand course={searchedCourse}/>
            <button className="absolute top-[calc(50%-2rem)] right-[calc(-1.5rem)] w-6 h-12 bg-background rounded-r-lg border-r shadow-lg flex justify-center items-center">
              <VscTriangleLeft size="15"/>
            </button>
          </section>
        : <section className="box-content absolute w-1/3">
            <SearchBar />
        </section>
}