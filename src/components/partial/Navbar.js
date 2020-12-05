import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {userGetter} from "../../utils/userGetter";

class Navbar extends Component {

    state = {
        user: {}
    }

    async componentDidMount() {
        const user_id = localStorage.getItem("user_id")
        let user = {};

        user = await userGetter(user_id)

        this.setState({
            user
        })
    }

render() {
    const {role, assigned_classroom} = this.state.user;
    const user_id = localStorage.getItem("user_id")

    const logoutNavLink = user_id === null || user_id === undefined ? (
        <li className="nav-item">
            <Link className="nav-link" to="/">Login</Link>
        </li>
    ) : (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/change-password">Change Password</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-danger" to="/logout">Logout</Link>
            </li>
        </>
    )

    const teacherNavLinks = role === "teacher" ? (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={`/teachers/details/${user_id}`}>Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/teachers/edit/${user_id}`}>Update Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/classes/details/${assigned_classroom}`}>Your Class</Link>
            </li>
        </>
    ) : ("")

    const studentNavLinks = role === "student" ? (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={`/students/details/${user_id}`}>Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/students/edit/${user_id}`}>Update Profile</Link>
            </li>
        </>
    ) : ("")

    const adminNavLinks = role === "admin" ? (
        <>
        <li className="nav-item">
            <Link className="nav-link" to="/classes">Classes</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/students">Students</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/teachers">Teachers</Link>
        </li>
        </>
    ) : ("")

return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container"> 
    <h1 className="navbar-brand">
        CMS System
    </h1>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
            
            {teacherNavLinks}
            {studentNavLinks}
            {adminNavLinks}
            {logoutNavLink}
            
        </ul>
    </div>
    </div>
</nav>
)
}
}

export default Navbar;