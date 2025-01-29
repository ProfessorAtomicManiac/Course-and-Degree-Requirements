const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

//get course data
const data = fs.readFileSync('public/json/courses.json', 'utf8'); // Read the file
const courses = JSON.parse(data); // Parse JSON

const app = express();
const port = 4080;
const host = "0.0.0.0";

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/jsonInfo", express.static(__dirname + 'public/jsonInfo'));

//all courses
app.get("/all", (req, res) => {
	res.sendFile(__dirname + "/public/json/courses.json");
});

//single course
app.get("/:courseID", (req, res) => {
    courseID = req.params.courseID;//parseInt(req.params.courseID);
    console.log("Requested course with ID " + courseID);
    res.json(courses[courseID]);
});

//start
app.listen(port, host, () => {
	console.log("Server started on port " + port);
});
