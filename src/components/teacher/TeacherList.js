import React, { Component } from 'react';
import {connect} from "react-redux";
import {getAllTeachers} from "../../actions/teacherActions";
import TeacherItem from "./TeacherItem";
import {Link} from "react-router-dom";
import {userGetter} from "../../utils/userGetter";
import paginate from "../../utils/paginate";
import Pagination from "../partial/Pagination";

class TeacherList extends Component {

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

        this.props.getAllTeachers()
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
        let teacherList = this.props.teachers;
        const {onChange} = this;

        if (searched_name){
            teacherList = teacherList.filter(item => {
                return item.name.toLowerCase().includes(searched_name.toLowerCase())
            })
        }

        const pageObject = paginate(teacherList.length, currentPage, 6, 5)

        const currentTeacherList = teacherList.slice(pageObject.startIndex, pageObject.endIndex + 1);

        const teacherItems = currentTeacherList.map(teacherItem => {
            return <TeacherItem key={teacherItem._id} teacherItem={teacherItem}/>
        })

        return (
            <div className="container">
                <Link to="/teachers/add" className="btn btn-primary">Add Teacher</Link>

                <div className="search-container">
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Teacher Name</span>
                            </div>
                                <input type="text" className="form-control" placeholder="Teacher Name" 
                                id="searched_name"
                                name="searched_name"
                                value={searched_name}
                                onChange={onChange} />
                            </div>
                    </form>
                </div>

                <ul className="list-group">
                    {teacherItems}
                </ul>
                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teachers: state.teacherReducer.teachers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTeachers: () => {dispatch(getAllTeachers())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);
