import React, { Component } from 'react';
import {connect} from "react-redux";
import {clearMessage} from "../../actions/messageActions";

class MessageAlert extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.clearMessage();
        }, 300)
    }

    render() {
        const {message, msg_type} = this.props;
        let renderedMessage = message;

        return (
            <div className={`alert alert-${msg_type}`} role="alert">
                {renderedMessage}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.messageReducer.message,
        msg_type: state.messageReducer.msg_type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => {dispatch(clearMessage())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageAlert);
