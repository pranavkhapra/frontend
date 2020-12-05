import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {deleteTeacher} from "../../actions/teacherActions";
import {connect} from "react-redux";
import {userGetter} from "../../utils/userGetter";
import {dateParserWithMonth} from "../../utils/dateParser";

class TeacherItem extends Component {

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
        const teacherItem = this.props.teacherItem;
        const {
            _id,
            name,
            dob
        } = teacherItem

        const buttons = this.state.role === "admin" ? (
            <ul>
                        <li>
                            <Link className="btn btn-warning" to={`/teachers/edit/${_id}`}>Edit</Link>
                        </li>
                        <li>
                            <button onClick={() => deleteTeacher(teacherItem)} className="btn btn-danger">Delete</button>
                        </li>
                    </ul>
        ) : ("")

        return (
            <div className="list-group-item">
                <div>
                    <Link to={`/teachers/details/${_id}`}>
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
        deleteTeacher: (deletedTeacher) => {dispatch(deleteTeacher(deletedTeacher))}
    }
}

export default connect(null, mapDispatchToProps)(TeacherItem);
