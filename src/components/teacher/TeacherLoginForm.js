import React, { Component } from 'react';
import {connect} from "react-redux";
import {teacherLogin} from "../../actions/teacherActions";
import MessageAlert from "../partial/MessageAlert";

class TeacherLoginForm extends Component {

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

    onTeacherLogin = (e) => {
        e.preventDefault()

        const {email, password} = this.state;

        this.props.teacherLogin({
            email, password
        })

        setTimeout(() => {
            if (localStorage.getItem("user_id")){
                this.props.history.push(`/teachers/details/${localStorage.getItem("user_id")}`)
                window.location.reload();
            }
        }, 2000)
    }

    render() {
        return (
            <div className="container login-container">
                <h1>Teacher Login</h1>
                <MessageAlert/>

                <form onSubmit={this.onTeacherLogin} method="POST">
                
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
        teacherLogin: (teacherAccount) => {dispatch(teacherLogin(teacherAccount))}
    }
}

export default connect(null, mapDispatchToProps)(TeacherLoginForm);
