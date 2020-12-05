import {
    ADD_ADMIN,
    EDIT_ADMIN,
    GET_ADMIN_BY_ID,
    GET_ALL_ADMINS
} from "../actions/types";

const initialState = {
    admins: [],
    admin: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ADMIN:
            return {
                ...state,
                admins: [...state.admins, action.payload.admin]
            };
            break;
        case EDIT_ADMIN:
            return {
                ...state,
                admins: state.admins.map(admin => {
                    if (admin._id === action.payload.admin._id) {
                        return action.payload.admin
                    }
                    return admin;
                })
            };
        case GET_ALL_ADMINS:
            return {
                ...state,
                admins: action.payload.admins
            }
            break;
        case GET_ADMIN_BY_ID:
            return {
                ...state,
                admin: action.payload.admin
            }
            default:
                return state;
                break;
    }
}

export default adminReducer;