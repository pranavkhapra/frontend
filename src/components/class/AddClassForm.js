import React, { Component } from 'react';
import MessageAlert from "../partial/MessageAlert";
import {connect} from "react-redux";
import {addClass} from "../../actions/classActions";

class AddClassForm extends Component {

    state = {
        class_name: ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onCreateClass = (e) => {
        e.preventDefault();
        const {class_name} = this.state;

        this.props.addClass({class_name})

        this.setState({
            class_name: ""
        }, () => {
            //this.props.history.push("/classes");
        })

    }

    render() {
        const {class_name} = this.state;

        return (
            <div className="container text-center">
                <h1>Add Student Form</h1>
                <MessageAlert/>
                <form onSubmit={this.onCreateClass}>
                    <div className="form-group">
                        <label>Class Name:</label>
                        <input type="text" id="class_name" name="class_name" className="form-control" placeholder="Class Name" value={class_name} onChange={this.onChange} required minLength="5" maxLength="12"/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block btn-primary">
                            Create Class
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addClass: (newClass) => {dispatch(addClass(newClass))}
    }
}

export default connect(null, mapDispatchToProps)(AddClassForm);
