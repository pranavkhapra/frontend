import adminReducer from "./adminReducer";
import messageReducer from "./messageReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";
import userReducer from "./userReducer";
import classReducer from "./classReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    adminReducer,
    messageReducer,
    studentReducer,
    teacherReducer,
    userReducer,
    classReducer
})

export default rootReducer;