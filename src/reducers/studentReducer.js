import {
    ADD_STUDENT,
    DELETE_STUDENT,
    EDIT_STUDENT,
    GET_ALL_STUDENTS,
    GET_STUDENTS_BY_NAME,
    GET_STUDENT_BY_ID
} from "../actions/types";

const initialState = {
    students: [],
    student: {}
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: action.payload.students
            };
            break;
        case GET_STUDENT_BY_ID:
            return {
                ...state,
                student: action.payload.student
            };
            break;
        case GET_STUDENTS_BY_NAME:
            return {
                ...state,
                students: action.payload.students
            };
            break;
        case ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload.student]
            };
            break;
        case EDIT_STUDENT:
            return {
                ...state,
                students: state.students.map(student => {
                    if (student._id === action.payload.student._id) {
                        return action.payload.student
                    }
                    return student;
                })
            };
            break;
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => {
                    return student._id !== action.payload.student._id
                })
            };
            break;
        default:
            return state;
            break;
    }
}

export default studentReducer;