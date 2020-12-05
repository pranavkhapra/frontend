import React, { Component } from 'react';
import {connect} from "react-redux";
import {adminLogin} from "../../actions/adminActions";
import MessageAlert from "../partial/MessageAlert";

class AdminLoginForm extends Component {

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

    onAdminLogin = (e) => {
        e.preventDefault()

        const {email, password} = this.state;

        this.props.adminLogin({
            email, password
        })

        setTimeout(() => {
            if (localStorage.getItem("token")){
                this.props.history.push(`/classes`)
                window.location.reload();
            }
        }, 2000)
    }

    render() {
        return (
            <div className="container login-container">
                <h1>Admin Login</h1>
                <MessageAlert/>

                <form onSubmit={this.onAdminLogin} method="POST">
                
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
        adminLogin: (adminAccount) => {dispatch(adminLogin(adminAccount))}
    }
}

export default connect(null, mapDispatchToProps)(AdminLoginForm);
