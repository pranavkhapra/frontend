import React, { Component } from 'react';
import {connect} from "react-redux";
import {getAllStudents} from "../../actions/studentActions";
import StudentItem from "./StudentItem";
import {Link} from "react-router-dom";
import {userGetter} from "../../utils/userGetter";
import paginate from "../../utils/paginate";
import Pagination from "../partial/Pagination";

class StudentList extends Component {

    state = {
        currentPage: 1,
        searched_name: ""
    }

    async componentDidMount(){
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id)

        if (user == null || user.role != "admin"){
            this.props.history.push("/");
        }

        if (user.role == "student") {
            this.props.history.push(`/students/details/${user_id}`);
        }

        if (user.role == "teacher") {
            this.props.history.push(`/teachers/details/${user_id}`);
        }

        this.props.getAllStudents()
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {currentPage, searched_name} = this.state;
        let studentList = this.props.students;
        const {onChange} = this;

        if (searched_name){
            studentList = studentList.filter(item => {
                return item.name.toLowerCase().includes(searched_name.toLowerCase())
            })
        }

        const pageObject = paginate(studentList.length, currentPage, 6, 5)

        const currentStudentList = studentList.slice(pageObject.startIndex, pageObject.endIndex + 1);

        const studentItems = currentStudentList.map(studentItem => {
            return <StudentItem key={studentItem._id} studentItem={studentItem}/>
        })

        return (
            <div className="container">
                <Link to="/students/add" className="btn btn-primary">Add Student</Link>

                <div className="search-container">
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Student Name</span>
                            </div>
                                <input type="text" className="form-control" placeholder="Student Name" 
                                id="searched_name"
                                name="searched_name"
                                value={searched_name}
                                onChange={onChange} />
                            </div>
                    </form>
                </div>

                <ul className="list-group">
                    {studentItems}
                </ul>
                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.studentReducer.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStudents: () => {dispatch(getAllStudents())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
