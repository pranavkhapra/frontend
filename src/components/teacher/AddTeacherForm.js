import React, { Component } from 'react';
import {connect} from "react-redux";
import {addTeacher} from "../../actions/teacherActions";
import {getAllClasses} from "../../actions/classActions";
import MessageAlert from "../partial/MessageAlert";
import {userGetter} from "../../utils/userGetter";

class AddTeacherForm extends Component {

    state = {
        name: "",
        phone_number: "",
        dob: "",
        address: "",
        email: "",
        password: "",
        assigned_classroom: ""
    }

    async componentDidMount() {
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id)

        if (user == null || user.role != "admin"){
            this.props.history.push("/");
        }

        if (user.role == "student") {
            this.props.history.push(`/students/details/${user_id}`);
        }

        if (user.role == "teacher") {
            this.props.history.push(`/teachers/details/${user_id}`);
        }

        this.props.getAllClasses()
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onAddTeacher = (e) => {
        e.preventDefault();
        const {
            name,
            phone_number,
            dob,
            address,
            email,
            password,
            assigned_classroom
        } = this.state;

        this.props.addTeacher({
            name,
            phone_number,
            dob,
            address,
            email,
            password,
            assigned_classroom
        })

        this.setState({
            name: "",
            phone_number: "",
            dob: "",
            address: "",
            email: "",
            password: "",
            assigned_classroom: ""
        }, () => {
            //this.props.history.push("/teachers");
        })
    }

    render() {

        const {
            name,
            phone_number,
            dob,
            address,
            email,
            password,
            assigned_classroom
        } = this.state;

        const classItems = this.props.classes.map((classItem, index) => {
            /*
            if (index === 0){
                return <option key={classItem._id} selected value={classItem.class_name}>
                    {classItem.class_name}
                </option>
            }
            */
            return <option key={classItem._id} value={classItem.class_name}>
                {classItem.class_name}
            </option>
        })

        return (
            <div className="container">
                <h1>Add Teacher Form</h1>
                <MessageAlert/>

                <form onSubmit={this.onAddTeacher} method="POST">

                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" placeholder="Name" type="text" id="name" name="name" onChange={this.onChange} required value={name}/>
                    </div>

                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input className="form-control" placeholder="Phone Number" type="text" id="phone_number" name="phone_number" onChange={this.onChange} required value={phone_number}/>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input className="form-control" type="date" id="dob" name="dob" onChange={this.onChange}required value={dob}/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" placeholder="Email" type="email" id="email" name="email" onChange={this.onChange} required value={email}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control" placeholder="Password" type="password" id="password" name="password" onChange={this.onChange} required value={password}/>
                    </div>

                    <div className="form-group">
                        <label>Address:</label>
                        <textarea className="form-control" placeholder="Address" id="address" name="address" value={address} onChange={this.onChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Assigned Classroom:</label>
                        <select required id="assigned_classroom" className="custom-select" defaultValue={""} onChange={this.onChange}>
                            <option key="0" value={""} disabled>
                                None
                            </option>
                            {classItems}
                        </select>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Create Teacher</button>
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
        addTeacher: (newTeacher) => {dispatch(addTeacher(newTeacher))},
        getAllClasses: () => {dispatch(getAllClasses())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacherForm);
