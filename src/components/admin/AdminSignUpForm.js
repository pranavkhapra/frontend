import React, { Component } from 'react';
import {connect} from "react-redux";
import {adminLogin, addAdmin} from "../../actions/adminActions";

class AdminSignUpForm extends Component {

    state = {
        email: "",
        password: ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onAdminLogin = (e) => {
        e.preventDefault()

        const {email, password} = this.state;

        this.props.addAdmin({
            email, password
        })

        this.props.adminAccount({
            email, password
        })
    }

    render() {
        return (
            <div>
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
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        adminLogin: (adminAccount) => {dispatch(adminLogin(adminAccount))},
        addAdmin: (newAdmin) => {dispatch(addAdmin(newAdmin))}
    }
}

export default connect(null, mapDispatchToProps)(AdminSignUpForm);
