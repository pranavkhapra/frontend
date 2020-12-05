import React, { Component } from 'react';
import axios from "axios";
import {getStudentByClassNameURL, getTeacherByClassNameURL} from "../../config/routes";
import StudentItem from "../student/StudentItem";
import TeacherItem from "../teacher/TeacherItem";

class ClassDetail extends Component {

    state = {
        teacher: {},
        students: []
    }

    async componentDidMount() {
        const {class_name} = this.props.match.params;

        let res = await axios.get(getStudentByClassNameURL(class_name));
        const students = res.data.data;

        res = await axios.get(getTeacherByClassNameURL(class_name));
        const teacher = res.data.data;

        this.setState({
            students,
            teacher
        })
    }

    render() {
        const {students, teacher} = this.state;

        const studentList = students.length === 0 ? (
            <h2>There is no student in this class</h2>
        ) : students.map(studentItem => {
            return <StudentItem key={studentItem._id} studentItem={studentItem}/>
        })

        const teacherItem = teacher === null ? (
            <h2>There is no teacher in this class</h2>
        ) : (
            <TeacherItem key={teacher._id} teacherItem={teacher}/>
        ) 

        return (
            <div className="container">
                <h2>Teacher</h2>
                <ul className="list-group">
                    {teacherItem}
                </ul>
                <h2>Students</h2>
                <ul className="list-group">
                    {studentList}
                </ul>
            </div>
        )
    }
}

export default ClassDetail;
