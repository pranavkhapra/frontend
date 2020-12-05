import {
    USER_LOGIN,
    USER_LOGOUT
} from "./types";

export const userLogin = (token, user_id) => {
    return (dispatch) => {
        return dispatch({
            type: USER_LOGIN,
            payload: {
                user_id,
                token,
                date: Date.now()
            }
        })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        return dispatch({
            type: USER_LOGOUT
        })
    }
}

