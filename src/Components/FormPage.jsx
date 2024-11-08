import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function FormPage() {
    const [student, setStudent] = useState({
        studentname: "",
        number: "",
        email: "",
        gender: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [registerdata, setRegisterData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(student);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const studentExist = registerdata.some((data) => data.number === student.number && data.email === student.email);
            if (studentExist) {
                Swal.fire("Student with this number/email already exists");
            } else {
                try {
                    const res = await axios.post("http://localhost:3001/api/students", student);
                    Swal.fire("Student info submitted successfully");
                    console.log(res);
                    setStudent({
                        studentname: "",
                        number: "",
                        email: "",
                        gender: ""
                    });
                    navigate("/HomePage");
                } catch (error) {
                    console.error("Error saving student:", error);
                }
            }
        } else {
            Swal.fire("Please fill out all required details correctly");
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.studentname.trim()) {
            errors.studentname = 'Student name is required';
        } else if (data.studentname.length < 4) {
            errors.studentname = "Username must be at least 4 characters long";
        }

        if (!data.number.trim()) {
            errors.number = 'Mobile number is required';
        } else if (data.number.length !== 10) {
            errors.number = 'Number must be exactly 10 digits';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.gender) {
            errors.gender = 'Gender is required';
        }

        return errors;
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/students");
                setRegisterData(res.data);
            } catch (err) {
                console.error("Failed to fetch students:", err);
            }
        };

        fetchStudents();
    }, []);

    const isFormValid = student.studentname && student.number && student.email && student.gender;

    return (
        <div className="container mx-auto p-4 max-w-md bg-slate-100 rounded-md shadow-md">
            <center className="text-3xl font-semibold mb-4">STUDENT REGISTRATION FORM</center>
            <form onSubmit={formSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Student FullName</label>
                    <input
                        type="text"
                        name="studentname"
                        value={student.studentname}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.studentname && <span className="text-red-950">{errors.studentname}</span>}
                </div>
                <div>
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                        type="number"
                        name="number"
                        value={student.number}
                        onChange={handleChange}
                        placeholder="Enter Number"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.number && <span className="text-red-950">{errors.number}</span>}
                </div>
                <div>
                    <label className="block text-gray-700">Email ID</label>
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <span className="text-red-950">{errors.email}</span>}
                </div>
                <div>
                    <label className="block text-gray-700">Gender</label>
                    <div className="flex space-x-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={student.gender === "Male"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={student.gender === "Female"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                    {errors.gender && <span className="text-red-950">{errors.gender}</span>}
                </div>
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                    REGISTER
                </button>
            </form>
        </div>
    );
}

export default FormPage;
