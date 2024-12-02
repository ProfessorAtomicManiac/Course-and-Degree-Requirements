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
                    
                    if isBold:
                        started = True
                        #if the title continues to the next line, add it
                        # len() > 0 is so there arent errors
                        if len(courseInfos.keys()) > 0 and courseInfos[list(courseInfos.keys())[-1]] == "":
                            lastKey = list(courseInfos.keys())[-1]
                            courseInfos[lastKey + " " + text] = courseInfos.pop(lastKey)
                        else:
                            #new section
                            courseInfos[text] = ""
                    elif started: 
                        lastKey = list(courseInfos.keys())[-1]
                        courseInfos[lastKey] += text + " "
                    
                    #add to course_names if it isnt a course info header
                    # if text not in non_course_names:
                        
                    #     #if it doesnt have a number, add it to the prev course
                    #     #this would happen if there was a newline mid course name
                    #     if not bool(re.search(r'\d', text)):
                    #         last_key = list(courseInfos.keys())[-1]
                    #         courseInfos[last_key + " " + text] = courseInfos.pop(last_key)
                    #     else:
                    #         courseInfos[text] = {}
                    # else:
    return courseInfos
    
def pdfToJson(pdf_path, json_path):
    #open pdf and json files
    pdf_file = fitz.open(pdf_path)
    json_file = open(json_path, 'w', encoding="utf-8") #clears if it exists
    
    allCourseData = {}
    
    #go through pages
    for page_num in range(len(pdf_file)):
        print(f"Page {page_num + 1}/{len(pdf_file)}")
        
        page = pdf_file[page_num]
        pageData = getPageData(page)
        allCourseData.update(pageData)
        
        
    #put data into json
    json.dump(allCourseData, json_file, indent=4, ensure_ascii=False)
    
    #clean up
    pdf_file.close()
    json_file.close()
    
        

# Usage example
pdf_path = "Data-Collection/Raw-Data/2024-2025-spring-courses-cut-single.pdf"
json_path = "Data-Collection/Processed-Data/courses.json"

non_course_names = ["Requisites:", "Course Designation:", "Learning Outcomes:", "Last Taught:", "Repeatable for Credit:"]

pdfToJson(pdf_path, json_path)
