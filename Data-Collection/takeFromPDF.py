import fitz  # pip install PyMuPDF
import re
import json

def getPageData(page):
    blocks = page.get_text("dict")["blocks"]
    
    courseInfos = {}
    
    started = False
    
    #go through blocks
    for block in blocks:
        #go through lines
        for line in block["lines"]:
            for span in line["spans"]:
                
                #get text info
                fontSize = span["size"]
                fontName = span["font"]
                isBold = "Bold" in fontName
                
                #if it isn't a title
                if fontSize == 8:
                    #add to list
                    
                    #get rid of leading and trailing whitespace and spaces
                    text = span["text"].replace("\xa0", " ").strip()
                    
                    #if a section (course title or course information title)
                    if isBold:
                        #show that the page info has started
                        #might collect page number and such if this wasnt here
                        started = True
                        
                        #add a section to the dict
                        if text in courseInfoSections:
                            #find the last course added
                            lastKey = list(courseInfos.keys())[-1]
                            
                            #clean up
                            text = text.replace(":", "")
                            
                            #create section
                            courseInfos[lastKey][text] = ""
                        else:
                            #add course
                            
                            #if it isnt a info section, that means it is a title
                            #if the course section is empty, that means the title had a newline in the middle
                            if len(courseInfos.keys()) > 0 and courseInfos[list(courseInfos.keys())[-1]] == {"Info": ""}:
                                #get the last course added
                                lastKey = list(courseInfos.keys())[-1]
                                
                                #add onto the course name
                                courseInfos[lastKey + " " + text] = courseInfos.pop(lastKey)
                            else:
                                #just create a new course section if it isnt empty
                                courseInfos[text] = {"Info": ""}
                    elif started:
                        #get the last course and last info section
                        lastCourseKey = list(courseInfos.keys())[-1]
                        lastInfoKey = list(courseInfos[lastCourseKey].keys())[-1]
                        
                        #set it to text in between sections that are bold
                        courseInfos[lastCourseKey][lastInfoKey] = (courseInfos[lastCourseKey][lastInfoKey] + " " + text).strip()
    return courseInfos
    
def pdfToJson(pdf_path, json_path):
    #open pdf and json files
    pdf_file = fitz.open(pdf_path)
    json_file = open(json_path, 'w', encoding="utf-8") #clears if it exists
   
    #initialize dict 
    allCourseData = {}
    
    #loop through pages
    totalCourses = 0
    for page_num in range(len(pdf_file)):
        #get a pdf page
        page = pdf_file[page_num]
        
        #get course data from 1 page
        pageData = getPageData(page)
        
        #add onto dict of all course data
        allCourseData.update(pageData)
        
        #progress info
        totalCourses += len(pageData)
        print(f"Page {page_num + 1}/{len(pdf_file)}, Courses: {totalCourses}, Courses/Page: {round(totalCourses/(page_num + 1), 2)}")
        
    #put data into json
    print("Dumping to file...")
    json.dump(allCourseData, json_file, indent=4, ensure_ascii=False)
    
    #clean up
    pdf_file.close()
    json_file.close()
    
        

pdfPath = "Data-Collection/Raw-Data/2024-2025-spring-courses.pdf"
jsonPath = "Data-Collection/Processed-Data/courses.json"

courseInfoSections = ["Requisites:", "Course Designation:", "Learning Outcomes:", "Last Taught:", "Repeatable for Credit:"]

pdfToJson(pdfPath, jsonPath)
