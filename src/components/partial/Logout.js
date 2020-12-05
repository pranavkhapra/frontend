import React, { Component } from 'react';
import {connect} from "react-redux";
import {userLogout} from "../../actions/userActions";

class Logout extends Component {

    componentDidMount() {
        if (localStorage.getItem("token") !== undefined){
            this.props.userLogout();
        }
        this.props.history.push("/");
        window.location.reload();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => {dispatch(userLogout())}
    }
}

export default connect(null, mapDispatchToProps)(Logout);
