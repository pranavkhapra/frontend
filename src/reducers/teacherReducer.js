import {
    ADD_TEACHER,
    DELETE_TEACHER,
    EDIT_TEACHER,
    GET_ALL_TEACHERS,
    GET_TEACHERS_BY_NAME,
    GET_TEACHER_BY_ID
} from "../actions/types";

const initialState = {
    teachers: [],
    teacher: {}
}

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TEACHERS:
            return {
                ...state,
                teachers: action.payload.teachers
            };
            break;
        case GET_TEACHER_BY_ID:
            return {
                ...state,
                teacher: action.payload.teacher
            };
            break;
        case GET_TEACHERS_BY_NAME:
            return {
                ...state,
                teachers: action.payload.teachers
            };
            break;
        case ADD_TEACHER:
            return {
                ...state,
                teachers: [...state.teachers, action.payload.teacher]
            };
            break;
        case EDIT_TEACHER:
            return {
                ...state,
                teachers: state.teachers.map(teacher => {
                    if (teacher._id === action.payload.teacher._id) {
                        return action.payload.teacher
                    }
                    return teacher;
                })
            };
            break;
        case DELETE_TEACHER:
            return {
                ...state,
                teachers: state.teachers.filter(teacher => {
                    return teacher._id !== action.payload.teacher._id
                })
            };
            break;
        default:
            return state;
            break;
    }
}

export default teacherReducer;