import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="home-login">
                    <h1>Student Management System</h1>
                    <Link to="/students/login" className="btn btn-primary btn-block">Login as Student</Link>
                    <Link to="/teachers/login" className="btn btn-success btn-block">Login as Teacher</Link>
                    <Link to="/admins/login" className="btn btn-info btn-block">Login as Admin</Link>
                    {/* <Link to='/admins/signup' className="btn btn-info btn-block">Signup as Admin</Link> */}
                </div>
            </div>
        )
    }
}

export default Home;
