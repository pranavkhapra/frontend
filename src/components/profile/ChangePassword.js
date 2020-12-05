import React, { Component } from 'react';
import {connect} from "react-redux";
import {studentChangePassword} from "../../actions/studentActions";
import {teacherChangePassword} from "../../actions/teacherActions";
import {adminChangePassword} from "../../actions/adminActions";
import MessageAlert from "../partial/MessageAlert";
import {userGetter} from "../../utils/userGetter";

class ChangePassword extends Component {

    state = {
        old_password: "",
        new_password: "",
        user: {}
    }

    async componentDidMount() {
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id)

        this.setState({
            user
        })

        if (user == null){
            this.props.history.push("/");
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {user, old_password, new_password} = this.state;
        let user_id = localStorage.getItem("user_id");

        if (user.role === 'student'){
            this.props.studentChangePassword(user_id, old_password, new_password)
        }

        if (user.role === 'teacher'){
            this.props.teacherChangePassword(user_id, old_password, new_password)
        }

        if (user.role === 'admin'){
            this.props.adminChangePassword(user_id, old_password, new_password)
        }

        this.setState({
            old_password: "",
            new_password: "",
        })
    }

    render() {
        const {old_password, new_password} = this.state;
            
        return (
            <div className="container">
                <h1>Change Password</h1>
                <MessageAlert/>    

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Old Password:</label>
                        <input className="form-control" placeholder="Old Password" type="password" id="old_password" name="old_password" onChange={this.onChange} required value={old_password}/>
                    </div>

                    <div className="form-group">
                        <label>New Password:</label>
                        <input className="form-control" placeholder="New Password" type="password" id="new_password" name="new_password" onChange={this.onChange} required value={new_password}/>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Change Password</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        studentChangePassword: (updatedStudentID, oldPassword, newPassword) => {dispatch(studentChangePassword(updatedStudentID, oldPassword, newPassword))},
        teacherChangePassword: (updatedTeacherID, oldPassword, newPassword) => {dispatch(teacherChangePassword(updatedTeacherID, oldPassword, newPassword))},
        adminChangePassword: (updatedAdminID, oldPassword, newPassword) => {dispatch(adminChangePassword(updatedAdminID, oldPassword, newPassword))}
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword);
