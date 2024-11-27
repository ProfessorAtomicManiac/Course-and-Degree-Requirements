from PyPDF2 import PdfReader
import re

errors = 0
courseCount = 0
with open("Data-Collection/Processed-Data/courseReqs.txt", 'w') as outputFile:
    with open("Data-Collection/Processed-Data/courseReqsErrors.txt", 'w') as errorFile:
        reader = PdfReader("Data-Collection/Raw-Data/2024-2025-spring-courses.pdf")
        numPages = len(reader.pages)
        for pageNumber in range(numPages):
            page = reader.pages[pageNumber]
            text = page.extract_text()
            
            #get requisites
            pattern = r"Requisites:(.*?)Repeatable for Credit" #requisites are between "Requisites:" and "Course Designation"
            requisites = re.findall(pattern, text, re.DOTALL)
            requisites = [requisite.split("Course Designation")[0] for requisite in requisites]
            requisites = [requisite.replace("\xa0", " ") for requisite in requisites] #get rid of non-breaking spaces
            requisites = [requisite.replace("\n", " ") for requisite in requisites] #get rid of un-needed breaks
            requisites = [requisite.strip() for requisite in requisites] #get rid of spaces and such at start and end

            #get courses
            pattern = r'—(.*?)credit' #course names are between a dash (usually) and credit count
            courses = re.findall(pattern, text, re.DOTALL)
            courses = [course.replace("\xa0", " ") for course in courses] #get rid of non-breaking spaces
            courses = [course.replace("\n", " ") for course in courses] #get rid of un-needed breaks
            courses = [" ".join(course.split(" ")[:len(course.split(" ")) - 2]) for course in courses] #get rid of trailing credit amount
            courses = [course.strip() for course in courses] #get rid of spaces and such at start and end

            if len(courses) == len(requisites):
                for i in range(len(courses)):
                    outputFile.write(f"\n\n{courses[i]}:\n")
                    outputFile.write(requisites[i])
                    courseCount += 1
            else:
                errors += 1
                errorFile.write(f"{len(courses)} Courses to {len(requisites)} requisites")
                errorFile.write("\n\n")
                errorFile.write(str(text))
                errorFile.write("\n\n")
                errorFile.write(str(courses))
                errorFile.write("\n\n")
                errorFile.write(str(requisites))
                errorFile.write("\n\n\n\n\n")
                
            
            print(f"Pages read: {pageNumber}/{numPages}, Courses: {courseCount}, Errors: {errors}")