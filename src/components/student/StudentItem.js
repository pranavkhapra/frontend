import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {deleteStudent} from "../../actions/studentActions";
import {connect} from "react-redux";
import {userGetter} from "../../utils/userGetter";
import {dateParserWithMonth} from "../../utils/dateParser";

class StudentItem extends Component {

    state = {
        role: ""
    }

    async componentDidMount(){
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id)

        this.setState({
            role: user.role
        })
    }

    render() {
        const studentItem = this.props.studentItem;
        const {
            _id,
            name,
            dob
        } = studentItem

        const buttons = this.state.role === "admin" ? (
            <ul>
                <li>
                    <Link className="btn btn-warning" to={`/students/edit/${_id}`}>Edit</Link>
                </li>
                <li>
                    <button onClick={() => deleteStudent(studentItem)} className="btn btn-danger">Delete</button>
                </li>
            </ul>
        ) : ("")

        return (
            <div className="list-group-item">
                <div>
                    <Link to={`/students/details/${_id}`}>
                        <h4>{name}</h4>
                    </Link>
                    <h5>Date of Birth: {dateParserWithMonth(dob)}</h5>
                </div>
                {buttons}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (deletedStudent) => {dispatch(deleteStudent(deletedStudent))}
    }
}

export default connect(null, mapDispatchToProps)(StudentItem);
