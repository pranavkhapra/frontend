import React, { Component } from 'react';
import {connect} from "react-redux";
import {getAllClasses} from "../../actions/classActions";
import ClassItem from "./ClassItem";
import {Link} from "react-router-dom";
import {userGetter} from "../../utils/userGetter";
import paginate from "../../utils/paginate";
import Pagination from "../partial/Pagination";

class ListOfClasses extends Component {

    state = {
        currentPage: 1,
        searched_classname: "",
    }

    async componentDidMount(){
        let user_id = localStorage.getItem("user_id");
        let user = await userGetter(user_id)
        await this.props.getAllClasses();

        if (user.role == "student") {
            this.props.history.push(`/students/details/${user_id}`);
        }

        if (user.role == "teacher") {
            this.props.history.push(`/teachers/details/${user_id}`);
        }
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    /*
    onSearchByName = (e) => {
        const search_name = e.target.value;

        console.log(this.props.classes)

        this.props.classes = this.props.classes.filter(item => {
            return item.class_name.toLowerCase().includes(search_name.toLowerCase());
        })

        console.log(this.props.classes)
    }
    */

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {currentPage, searched_classname} = this.state;
        let classList = this.props.classes;
        //const {onSearchByName} = this;
        const {onChange} = this;

        if (searched_classname){
            classList = classList.filter(item => {
                return item.class_name.toLowerCase().includes(searched_classname.toLowerCase())
            })
        }

        const pageObject = paginate(classList.length, currentPage, 6, 5)

        const currentClassList = classList.slice(pageObject.startIndex, pageObject.endIndex + 1);

        const classItems = currentClassList.map(classItem => {
            return <ClassItem classItem={classItem} key={classItem._id}/>
        })
        
        return (
            <div className="container">
                <Link to="/classes/add" className="btn btn-primary">Add Class</Link>

                <div className="search-container">
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Class Name</span>
                            </div>
                                <input type="text" className="form-control" placeholder="Class Name" 
                                id="searched_classname"
                                name="searched_classname"
                                onChange={onChange} />
                            </div>
                    </form>
                </div>
                
                <div className="list-group">
                    {classItems}
                </div>
                <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        classes: state.classReducer.classes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClasses: () => {dispatch(getAllClasses())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfClasses);
