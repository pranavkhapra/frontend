import React, { Component } from 'react';
import {connect} from "react-redux";
import {studentLogin} from "../../actions/studentActions";
import MessageAlert from "../partial/MessageAlert";

class StudentLoginForm extends Component {

    state = {
        email: "",
        password: ""
    }

    componentDidMount() {
        if (localStorage.getItem("token") === undefined){
            this.props.history.push("/logout")
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onStudentLogin = (e) => {
        e.preventDefault()

        const {email, password} = this.state;

        this.props.studentLogin({
            email, password
        })

        setTimeout(() => {
            if (localStorage.getItem("user_id")){
                this.props.history.push(`/students/details/${localStorage.getItem("user_id")}`)
                window.location.reload();
            }
        }, 2000)
        
    }

    render() {
        return (
            <div className="container login-container">
                <h1>Student Login</h1>
                <MessageAlert/>

                <form onSubmit={this.onStudentLogin} method="POST">
                
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" type="email" placeholder="Email" id="email" name="email" onChange={this.onChange} required/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control" type="password" placeholder="Password" id="password" name="password" onChange={this.onChange} required/>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        studentLogin: (studentAccount) => {dispatch(studentLogin(studentAccount))}
    }
}

export default connect(null, mapDispatchToProps)(StudentLoginForm);
