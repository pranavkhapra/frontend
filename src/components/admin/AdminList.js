import React, { Component } from 'react';
import {connect} from "react-redux";
import {getAllAdmins} from "../../actions/adminActions";
import AdminItem from "./AdminItem";

class AdminList extends Component {

    componentDidMount(){
        this.props.getAllAdmins()
    }

    render() {
        const adminList = this.props.admins.map(adminItem => {
            return <AdminItem adminItem={adminItem}/>
        })

        return (
            <div>
                {adminList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        admins: state.adminReducer.admins
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAdmins: () => {dispatch(getAllAdmins())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
