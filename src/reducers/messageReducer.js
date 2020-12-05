import {
    SET_MESSAGE,
    CLEAR_MESSAGE
} from "../actions/types";

const initialState = {
    message: null,
    msg_type: ""
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
                msg_type: action.payload.msg_type
            };
            break;
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
                msg_type: ""
            };
            break;
        default:
            return state;
            break;
    }
}

export default messageReducer;