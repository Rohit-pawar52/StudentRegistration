const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
mongoose.connect("mongodb://localhost:27017/StudentFormDB");

const studentSchema = new mongoose.Schema({
    studentname: String,
    number: String,
    email: String,
    gender: String
});

const Studentdata = mongoose.model('Student', studentSchema);

app.get('/api/students', async (req, res ) => {
    try{
        const students = await Studentdata.find();
        res.json(students)
    } catch (error) {
        res.status(500).json({ message: "error fetching schema" });
    }
})

app.post('/api/students', async (req, res) => {
    const newStudent = new Studentdata(req.body);
    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ message: 'error saving student' });
    }
});


app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`)
})