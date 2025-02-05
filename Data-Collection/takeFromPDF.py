import fitz  # pip install PyMuPDF
import json
import os

from ParseRequisites import *
 
def getPageData(page):
    blocks = page.get_text("dict")["blocks"]
    
    courseInfos = []
    
    #go through blocks
    for block in blocks:
        #go through lines
        for line in block["lines"]:
            for span in line["spans"]:
                #get text info
                fontSize = span["size"]
                fontName = span["font"]
                isBold = "Bold" in fontName
                
                #if it isn't a title, add the data
                if fontSize == 8:
                    #get rid of leading and trailing whitespace and weird spaces
                    text = span["text"].replace("\xa0", " ").strip()
                    
                    #if a section (course title or course information title)
                    if isBold:
                        #add a section to the dict
                        if text in courseInfoSections:
                            #clean up
                            text = text.replace(":", "")
                            
                            #create section for last course created
                            courseInfos[-1][text] = ""
                        else:
                            #add course
                            
                            #if it isnt a info section, that means it is a title
                            #if the course section is empty, that means the title had a newline in the middle
                            if len(courseInfos) > 0 and courseInfos[-1]["Info"] == "":
                                #add onto the course name
                                courseInfos[-1]["Course Name"] += text
                            else:
                                #create a new course section if it isnt empty
                                courseInfos.append({
                                    "Course Name": text, 
                                    "Info": ""
                                })
                    elif len(courseInfos) > 0:
                        #get the last info section
                        lastInfoKey = list(courseInfos[-1].keys())[-1]
                        
                        #set it to text in between sections that are bold
                        courseInfos[-1][lastInfoKey] = (courseInfos[-1][lastInfoKey] + " " + text).strip()

    #post processing:
    #loop through courses
    try:
        for courseID in range(len(courseInfos)):
            #split course code and name
            splitTitle = courseInfos[courseID]["Course Name"].split("—")
            
            #first section is the course code (CIV ENG 909)
            courseCode = splitTitle[0].strip().replace("  ", " ")
            
            #the rest is the name
            courseName = "".join(splitTitle[1:]).strip()
            
            #add course name into info
            courseInfos[courseID]["Course Name"] = courseName
            courseInfos[courseID]["Course Code"] = courseCode
            
            #get the info that is under the course name
            basicInfo = courseInfos[courseID]["Info"].split(".")
            
            #not needed anymore
            del courseInfos[courseID]["Info"]
            
            #credits are the first part of the basic info
            #the number of credits are the first part of that
            courseInfos[courseID]["Credits"] = basicInfo[0].split(" ")[0]
            
            #the course description is the rest
            courseInfos[courseID]["Description"] = "".join(basicInfo[1:]).strip()
            
            #if learning outcomes exists
            #if "Learning Outcomes" in list(courseInfos[courseCode].keys()):
                #split learning outcomes into a list
                #split anything with a number-period-space
                #removes the first one since it always starts with a number-period-space,
                #so it will have a blank element
            #    courseInfos[courseCode]["Learning Outcomes"] = re.split(r'\d+\.\s', courseInfos[courseCode]["Learning Outcomes"])[1:]
            
            if "Requisites" in list(courseInfos[courseID].keys()):
                requisiteString = courseInfos[courseID]["Requisites"]

                courseInfos[courseID]["Requisite String"] = requisiteString
                
                try:
                    requisites, prohibited = parseRequisites(requisiteString)
                    courseInfos[courseID]["Requisites"] = requisites
                    courseInfos[courseID]["Prohibited"] = prohibited
                except Exception as e:
                    with open(errorPath, 'a') as errorFile:
                        errorFile.writelines(f"\nCouldnt parse requisite string: {requisiteString}\nError: {e}\n")
                        #print(f"\nRequisite string: {requisiteString}\n\nError: {e}\n")
                        #print(f"\n\nCourse stuff: {courseInfos}\n")
                    #exit()
                    courseInfos[courseID]["Requisites"] = "Couldn't Parse"
                    courseInfos[courseID]["Prohibited"] = "Couldn't Parse"
            else:
                #if it doesnt have requirements, it isnt a course
                #really only for like 2 weird cases at the start of the pdf
                del courseInfos[courseID]
            
        #remove unneeded sections
        for courseIndex in range(len(courseInfos)):
            for sectionKey in list(courseInfos[courseIndex].keys()):
                if sectionKey not in usedCourseInfoSections:
                    del courseInfos[courseIndex][sectionKey]
    except Exception as e:
        print(courseInfos)
    

    return courseInfos
    
def pdfToJson(pdf_path, json_path):
    #open pdf
    pdf_file = fitz.open(pdf_path)
    if os.path.exists(errorPath):
        os.remove(errorPath)
   
    #initialize list of things
    allCourseData = []
    
    #loop through pages
    totalCourses = 0
    for page_num in range(len(pdf_file)):
        #get a pdf page
        page = pdf_file[page_num]
        
        #get course data from 1 page
        pageData = getPageData(page)
        
        #add onto dict of all course data
        allCourseData.extend(pageData)
        
        #progress info
        totalCourses += len(pageData)
        if (page_num + 1)%100 == 0 or  page_num + 1 == len(pdf_file):
            print(f"Page {page_num + 1}/{len(pdf_file)}, Courses: {totalCourses}, Courses/Page: {round(totalCourses/(page_num + 1), 2)}")
    
    #add index to the data block
    for courseIndex in range(len(allCourseData)):
        allCourseData[courseIndex]["Course ID"] = courseIndex

    print("Dumping to file...")
    
    #open json file (clears if it exists)
    json_file = open(json_path, 'w', encoding="utf-8")
    
    #dump data into json
    json.dump(allCourseData, json_file, indent=4, ensure_ascii=False)
    
    #clean up
    pdf_file.close()
    json_file.close()
  

pdfPath = "Data-Collection/Raw-Data/2024-2025-spring-courses.pdf"
jsonPath = "Data-Collection/Processed-Data/courses.json"
errorPath = "Data-Collection/Processed-Data/errors.txt"

courseInfoSections = ["Requisites:", "Course Designation:", "Learning Outcomes:", "Last Taught:", "Repeatable for Credit:"]
usedCourseInfoSections = ["Credits", "Course Name", "Course Code", "Requisites", "Requisite String", "Prohibited"]

pdfToJson(pdfPath, jsonPath)
