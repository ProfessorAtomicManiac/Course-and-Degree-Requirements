import PyPDF2
import json
import re

# Function to parse a single course's details from text
def parse_course_details(course_text):
    course_data = {}

    print(course_text)
    print("\n\n\n\n")
    
    #get course code (CIV ENGR 890)
    course_match = course_text.splitlines()[0].strip()
    course_data["course"] = course_match if course_match else "Unknown"
    
    # get course title (MANAGERIAL ACCOUNTING)
    #course_title_match = re.match(r"^(.*?)\s[–—-]\s(.+)$", course_text.splitlines()[0])
    #course_data["course_title"] = course_title_match.group(2).strip() if course_title_match else "Unknown"

    # Extract credits (3 credits)
    credits_match = re.search(r"(\d+-?\d*) credits?\.", course_text)
    course_data["credits"] = credits_match.group(1) if credits_match else "Unknown"

    # Extract requisites (E C E 210, 252)
    requisites_match = re.search(r"Requisites: (.+?)\n", course_text)
    course_data["requisites"] = requisites_match.group(1).strip() if requisites_match else "Unknown"

    # Extract course designation
    designation_match = re.search(r"Course Designation: (.+?)\n", course_text)
    course_data["designation"] = designation_match.group(1).strip() if designation_match else "Unknown"

    # Extract repeatable status
    repeatable_match = re.search(r"Repeatable for Credit: (.+?)\n", course_text)
    course_data["repeatable"] = repeatable_match.group(1).strip() if repeatable_match else "Unknown"

    # Extract last taught (Fall 2024)
    last_taught_match = re.search(r"Last Taught: (.+?)\n", course_text)
    course_data["last_taught"] = last_taught_match.group(1).strip() if last_taught_match else "Unknown"

    # Extract learning outcomes
    outcomes = re.findall(r"Learning Outcomes: (\d+\..+?)(?=Audience|$)", course_text, re.DOTALL)
    course_data["learning_outcomes"] = [outcome.replace("\n", "") for outcome in outcomes] if outcomes else "Unknown"

    return course_data

# Function to extract and parse courses from PDF
def extract_courses_from_pdf(pdf_path):
    courses = []

    with open(pdf_path, "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)

        for page in reader.pages:
            text = page.extract_text()

            # Split courses by delimiter patterns (e.g., double newlines)
            raw_courses = re.split(r"\n{2,}", text)

            for raw_course in raw_courses:
                # Skip small segments that aren't courses
                if len(raw_course) < 100:
                    continue

                course_data = parse_course_details(raw_course)
                courses.append(course_data)

    return courses

# Main execution
pdf_path = "Data-Collection/Raw-Data/2024-2025-spring-courses-cut.pdf"
courses = extract_courses_from_pdf(pdf_path)

# Save to JSON
output_json = "Data-Collection/Processed-Data/courses.json"
with open(output_json, "w") as json_file:
    json.dump(courses, json_file, indent=4)

print(f"Extracted {len(courses)} courses and saved to {output_json}")
