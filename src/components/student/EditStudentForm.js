import React, { Component } from 'react';
import {connect} from "react-redux";
import {editStudent} from "../../actions/studentActions";
import {getAllClasses} from "../../actions/classActions";
import MessageAlert from "../partial/MessageAlert";
import axios from "axios";
import {getStudentByIDURL} from "../../config/routes";
import {userGetter} from "../../utils/userGetter";
import {dateParser} from "../../utils/dateParser";

class EditStudentForm extends Component {

    state = {
        name: "",
        phone_number: "",
        dob: "",
        address: "",
        assigned_classroom: "",
        student_item: {},
        user: {}
    }

    async componentDidMount() {
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id);

        this.setState({
            user
        })

        if (user == null){
            this.props.history.push("/");
        }

        /*
        if (user.role == "student") {
            this.props.history.push(`/students/details/${user_id}`);
        }
        */

        if (user.role == "teacher") {
            this.props.history.push(`/teachers/details/${user_id}`);
        }

        this.props.getAllClasses()

        const res = await axios.get(getStudentByIDURL(this.props.match.params.student_id))
        const {
            name,
            phone_number,
            dob,
            address,
            assigned_classroom,
        } = res.data.data;
        this.setState({
            student_item: res.data.data,
            name,
            phone_number,
            dob,
            address,
            assigned_classroom,
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onEditStudent = (e) => {
        const {
            name,
            phone_number,
            dob,
            address,
            assigned_classroom,
            student_item
        } = this.state;

        student_item.name = name;
        student_item.phone_number = phone_number;
        student_item.dob = dob;
        student_item.address = address;
        student_item.assigned_classroom = assigned_classroom;

        this.props.editStudent(student_item)

        this.setState({
            name: "",
            phone_number: "",
            dob: "",
            address: "",
            assigned_classroom: "",
            student_item: {}
        }, () => {
            this.props.history.push("/students");
        })

    }

    render() {

        const {class_name, name, dob, phone_number, address, user} = this.state;

        const classItems = this.props.classes.map((classItem, index) => {
            if (classItem.class_name === class_name){
                return <option key={classItem._id} defaultValue selected value={classItem.class_name}>
                    {classItem.class_name}
                </option>
            }
            return <option key={classItem._id} value={classItem.class_name}>
                {classItem.class_name}
            </option>
        })

        const assignedClassroomInput = user.role === "admin" ? (
            <div className="form-group">
                <label>Assigned Classroom:</label>
                <select required className="custom-select" id="assigned_classroom" onChange={this.onChange}>
                    {classItems}
                </select>
            </div>
        ) : ("");

        return (
            <div className="container">
                <h1>Edit Student Form</h1>
                <MessageAlert/>

                <form onSubmit={this.onEditStudent} method="POST">

                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" placeholder="Name" type="text" id="name" name="name" onChange={this.onChange} value={name} required/>
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input className="form-control" placeholder="Phone Number" type="text" id="phone_number" name="phone_number" onChange={this.onChange} value={phone_number} required/>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input className="form-control" type="date" id="dob" name="dob" onChange={this.onChange}value={dateParser(dob)} required/>
                    </div>

                    <div className="form-group">
                        <label>Address:</label>
                        <textarea className="form-control" placeholder="Address" id="address" name="address" value={address} onChange={this.onChange} required></textarea>
                    </div>

                    {assignedClassroomInput}

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Update Student</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classes: state.classReducer.classes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editStudent: (updatedStudent) => {dispatch(editStudent(updatedStudent))},
        getAllClasses: () => {dispatch(getAllClasses())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentForm);
