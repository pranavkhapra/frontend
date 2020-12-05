import React, { Component } from 'react';
import {Link} from "react-router-dom";

class AdminItem extends Component {
    render() {
        const {adminItem} = this.props
        
        return (
            <div>
                <h4>{adminItem.email}</h4>
                <h5>{adminItem.verified}</h5>
            </div>
        )
    }
}

export default AdminItem;
