import {
    ADD_CLASS,
    DELETE_CLASS,
    EDIT_CLASS,
    GET_ALL_CLASSES,
    GET_CLASSES_BY_NAME,
    GET_CLASS_BY_ID
} from "../actions/types";

const initialState = {
    classes: [],
    classItem: {}
}

const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CLASS:
            return {
                ...state,
                classes: state.classes.concat(action.payload.classItem)
            };
            break;
        case EDIT_CLASS:
            return {
                ...state,
                classes: state.classes.map(classItem => {
                    if (classItem._id === action.payload.classItem._id) {
                        return action.payload.classItem
                    }
                    return classItem;
                })
            };
        case GET_ALL_CLASSES:
            return {
                ...state,
                classes: action.payload.classes
            }
            break;
        case GET_CLASS_BY_ID:
            return {
                ...state,
                classItem: action.payload.classItem
            }
            break;
        case GET_CLASSES_BY_NAME:
            return {
                ...state,
                classes: action.payload.classes
            }
            break;
        case DELETE_CLASS:
            return {
                ...state,
                classes: state.classes.filter(classItem => {
                    return classItem._id !== action.payload.deletedClassID
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default classReducer;