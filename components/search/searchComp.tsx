import { useContext, useEffect, useState } from "react";
import SearchBar from "./searchbar";
import SearchExpand from "./searchExpand";
import { SearchContext } from "./searchContext";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

export default function SearchComponent() {

    const {searchedCourse} = useContext(SearchContext);
    // -1 == slide out, 0 == display/not shown, 1 == slide in
    const [slide, setSlide] = useState("");
    const [expanded, setExpanded] = useState(false);

    // i swear there's gotta be a better way to do this
    useEffect(() => {
      setExpanded(searchedCourse !== null);
      setSlide("");
    }, [searchedCourse])
  
    console.log("Slide: ", slide);
    console.log("Expanded: ", expanded);
    return searchedCourse !== null ? 
          <section 
            className={`${slide} box-content absolute w-1/3 h-screen bg-background border-r shadow-lg flex flex-col`}
          >
            <SearchBar />
            <SearchExpand course={searchedCourse}/>
            <button 
              className="absolute top-[calc(50%-2rem)] right-[calc(-1.5rem)] w-6 h-12 bg-background rounded-r-lg border-r shadow-lg flex justify-center items-center"
              onClick={() => {
                if (expanded) {
                  setSlide("slide-out");
                  setExpanded(false);
                } else {
                  setSlide("slide-in");
                  setExpanded(true);
                }
              }}
            >
              {expanded ? <VscTriangleLeft size="15"/> : <VscTriangleRight size="15"/>}
            </button>
          </section>
        : <section className="box-content absolute w-1/3">
            <SearchBar />
        </section>
}