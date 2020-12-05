import React, { Component } from 'react';
import MessageAlert from "../partial/MessageAlert";
import axios from "axios";
import {getClassByIDURL} from "../../config/routes";
import {connect} from "react-redux";
import {editClass} from "../../actions/classActions"

class EditClassForm extends Component {

    state = {
        class_name: "",
        class_item: {}
    }

    async componentDidMount() {
        const res = await axios.get(getClassByIDURL(this.props.match.params.class_id))
        const data = res.data.data;
        this.setState({
            class_name: data.class_name,
            class_item: data
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onCreateClass = (e) => {
        e.preventDefault();
        const {class_name, class_item} = this.state;

        class_item.class_name = class_name;

        this.props.editClass(class_item)

        this.setState({
            class_name: "",
            class_item: {}
        }, () => {
            this.props.history.push("/classes");
        })
    }

    render() {
        const {class_name} = this.state;

        return (
            <div className="container text-center">
                <h1>Edit Student Form</h1>
                <MessageAlert/>
                <form onSubmit={this.onCreateClass}>
                    <div className="form-group">
                        <label>Class Name:</label>
                        <input type="text" id="class_name" name="class_name" className="form-control" placeholder="Class Name" value={class_name} onChange={this.onChange} required minLength="5" maxLength="12"/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block btn-primary">
                            Update Class
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editClass: (updatedClass) => dispatch(editClass(updatedClass))
    }
}

export default connect(null, mapDispatchToProps)(EditClassForm);
