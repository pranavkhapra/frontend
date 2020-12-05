import {
    USER_LOGIN,
    USER_LOGOUT
} from "../actions/types";

const initialState = {
    token: null,
    date: null,
    user_id: ""
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("date", action.payload.date)
            localStorage.setItem("user_id", action.payload.user_id)
            return {
                ...state,
                token: localStorage.getItem("token"),
                date: localStorage.getItem("date"),
                user_id: localStorage.getItem("user_id")
            };
            break;
        case USER_LOGOUT:
            localStorage.removeItem("token")
            localStorage.removeItem("date")
            localStorage.removeItem("user_id")
            return {
                ...state,
                token: null,
                date: null,
                user_id: null
            };
            break;
        default:
            return state;
            break;
    }
}

export default userReducer;