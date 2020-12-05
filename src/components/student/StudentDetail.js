import React, { Component } from 'react';
import axios from "axios";
import {getStudentByIDURL} from "../../config/routes";
import {userGetter} from "../../utils/userGetter";
import {dateParser, dateParserWithMonth} from "../../utils/dateParser";

class StudentDetail extends Component {

    state = {
        student_item: {}
    }

    async componentDidMount(){
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id)

        if (user == null){
            this.props.history.push("/");
        }

        const res = await axios.get(getStudentByIDURL(this.props.match.params.student_id))
        this.setState({
            student_item: res.data.data
        })
    }

    render() {
        const {name, dob, email, assigned_classroom, phone_number, address, created_date} = this.state.student_item

        return (
            <div className="container detail-container">
                <h1 className="text-center">{name}</h1>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ul>
                            <li>
                                <b>Date of Birth: </b>{dateParserWithMonth(dob)}
                            </li>
                            <li>
                                <b>Email: </b>{email}
                            </li>
                            <li>
                                <b>Assigned Classroom: </b>{assigned_classroom}
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ul>
                            <li>
                                <b>Phone Number: </b>{phone_number}
                            </li>
                            <li>
                                <b>Address: </b>{address}
                            </li>
                            <li>
                                <b>Enrolled Date: </b>{dateParserWithMonth(created_date)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentDetail;
