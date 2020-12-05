import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {deleteClass} from "../../actions/classActions";
import {connect} from "react-redux";
import {dateParserWithMonth} from "../../utils/dateParser";

class ClassItem extends Component {

    render() {
        const {classItem, deleteClass} = this.props; 
        const {class_name, _id, created_date} = classItem;

        return (
            <div className="list-group-item">
                <div>
                    <Link to={`/classes/details/${class_name}`}>
                        <h4>{class_name}</h4>
                    </Link>
                    <h5>Created Date: {dateParserWithMonth(created_date)}</h5>
                </div>
                    <ul>
                        <li>
                            <Link className="btn btn-warning" to={`/classes/edit/${_id}`}>Edit</Link>
                        </li>
                        <li>
                            <button onClick={() => deleteClass(_id)} className="btn btn-danger">Delete</button>
                        </li>
                    </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteClass: (deletedClassID) => {dispatch(deleteClass(deletedClassID))}
    }
}

export default connect(null, mapDispatchToProps)(ClassItem);
