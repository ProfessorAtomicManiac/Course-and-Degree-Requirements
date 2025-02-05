import re

testRequisites = [
	#"PHM PRAC 656 or concurrent enrollment",
	#"Nursing BSN (Traditional, Accelerated or Collaborative), senior standing and declared in Health Promotion and Health Equity BS, or graduate/professional standing",
	"(ACCT I S 340 or concurrent enrollment), (ACCT I S 100 and GEN BUS 307 or 317), (ACCT I S 700 or concurrent enrollment), or declared in the Business Exchange program Not something something",
	#"(CHEM 103, 109, or 115) and (MATH 112, 114, 171 or placement into MATH 221), or graduate/professional standing"
	#"MATH 96 or placement into MATH 112 or satisfied Quantitative Reasoning (QR) A requirement. Not open to students with credit for ECON 101, 102, or 111"
	#"(ECON 101, 102, 111 or concurrent enrollment) and (MATH 211, 217, or 221)"
	#"Not open to students declared in the Nursing, Physician Assistant, or Doctor of Pharmacy programs",
	#"PHM PRAC 554, 556 and PHMCOL-M/PHM SCI  522",
	#"ZOOLOGY/BIOLOGY  101 and 102, ZOOLOGY/BIOLOGY/ BOTANY  152, (BIOCORE 381 and 382), or graduate/professional standing",
	#"PHM PRAC 550, 555,  556,   and 655",
	#"PHM PRAC 653, 655 and PHM SCI 623",
	#"Declared in Doctor of Pharmacy program with second year standing",
	#"Declared in MS Pharmaceutical Sciences: Psychoactive Pharmaceutical Investigation or Capstone Certificate in Psychoactive Pharmaceutical Investigation",
	#"PHM PRAC 655 or (NURSING 312 and NURSING 422)",
]

"""
steps to parse:
make everything lowercase
delete "placement into" and "concurrent enrollment" (add flag)
anything after "Not" is a "prohibited"
	(remove from the rest of the string)
replace requisite strings with indexes
	surrounded with {} to show it isn't a class
replace double spaces 1 space
repeat until no commas or parenthesis:
	split by commas
		"and" or "or" based on operater after last comma
		if lone numbers left
			take course degree from the one before
		mind parenthesis (don't split if inside)
	split by parenthesis
		remove comma if after close parenthesis
get rid of single element lists
	[["a"], "b"] -> ["a", "b"]
"""

#returns requisite and prohibited strings
def seperateProhibited(requisiteString):
	splitString = requisiteString.split(prohibitedSeperator)

	prohibitedString = ""
	if len(splitString) > 1:
		prohibitedString = splitString[1]

	return splitString[0], prohibitedString

#returns true if the input character is inside any of the strings in the base list of the passed list
def characterInBaseList(requisiteList, character):
	#loop through list
	for element in requisiteList:
		#if element is a string and includes the character, return true
		if isinstance(element, str) and character in element:
			return True
		
	#character not found
	return False

def parseRequisites(requisiteString):
	#make not case sensitive
	requisiteString = requisiteString.lower()

	#delete things
	#todo: add flag
	for stringChunkToDelete in requisiteStringChunksToDelete:
		requisiteString = requisiteString.replace(stringChunkToDelete, "")

	#get prohibited
	requisiteString, prohibitedString = seperateProhibited(requisiteString)

	#replace with indexes
	for stringChunkToReplace in requisiteStringChunks:
		requisiteString = requisiteString.replace(stringChunkToReplace, "{" + str(requisiteStringChunks.index(stringChunkToReplace)) + "}")

	#remove double spaces
	while "  " in requisiteString:
		requisiteString = requisiteString.replace("  ", " ")

	#needs to be converted to recursive
	#requisiteList = [requisiteString]
	#while characterInBaseList(requisiteList, "(") or characterInBaseList(requisiteList, ","):
	#	for requisiteIndex
	#recursivly split by commas, then split by perenthesis

	return requisiteString, prohibitedString


#all of the strings that aren't classes in the requisite string
requisiteStringChunks = ["graduate/professional standing", "satisfied Quantitative Reasoning (QR) A requirement", "senior standing", "declared in Health Promotion and Health Equity BS", "Declared in Doctor of Pharmacy program with second year standing", "declared in the Business Exchange program"]
requisiteStringChunksToDelete = ["placement into", "concurrent enrollment"]
prohibitedSeperator = "not"

#convert to lowercase
for requisiteStringIndex in range(len(requisiteStringChunks)):
	requisiteStringChunks[requisiteStringIndex] = requisiteStringChunks[requisiteStringIndex].lower()

#convert to lowercase
for requisiteStringIndex in range(len(requisiteStringChunksToDelete)):
	requisiteStringChunksToDelete[requisiteStringIndex] = requisiteStringChunksToDelete[requisiteStringIndex].lower()

if __name__ == "__main__":
	for requisiteString in testRequisites:
		print(f"\nStart: {requisiteString}")
		requisites, prohibited = parseRequisites(requisiteString)
		print(f"Requisites: {requisites}")
		print(f"Prohibited: {prohibited}\n")