import {
    ADD_STUDENT,
    DELETE_STUDENT,
    EDIT_STUDENT,
    GET_ALL_STUDENTS,
    GET_STUDENTS_BY_NAME,
    GET_STUDENT_BY_ID,
    SET_MESSAGE,
    USER_LOGIN,
    STUDENT_CHANGE_PASSWORD
} from "./types";
import axios from "axios";
import {
    allStudentsURL,
    addStudentURL,
    getDeleteStudentURL,
    getEditStudentURL,
    getStudentByIDURL,
    getStudentsByNameURL,
    studentLoginURL,
    getStudentChangePasswordURL
} from "../config/routes";

export const getAllStudents = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(allStudentsURL)
            const {
                data,
                success,
                message
            } = res.data;
            const students = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            return dispatch({
                type: GET_ALL_STUDENTS,
                payload: {
                    students,
                    message,
                    msg_type: "success"
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const getStudentByID = (student_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getStudentByIDURL(student_id))
            const {
                data,
                success,
                message
            } = res.data;
            const student = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            return dispatch({
                type: GET_STUDENT_BY_ID,
                payload: {
                    student,
                    message,
                    msg_type: "success"
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const getStudentsByName = (student_name) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getStudentsByNameURL(student_name))
            const {
                data,
                success,
                message
            } = res.data;
            const students = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            return dispatch({
                type: GET_STUDENTS_BY_NAME,
                payload: {
                    students,
                    message,
                    msg_type: "success"
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const addStudent = (newStudent) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(addStudentURL, newStudent)
            const {
                data,
                success,
                message
            } = res.data;
            const student = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message,
                    msg_type: "success"
                }
            })

            return dispatch({
                type: ADD_STUDENT,
                payload: {
                    student
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const editStudent = (updatedStudent) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getEditStudentURL(updatedStudent._id), updatedStudent)
            const {
                data,
                success,
                message
            } = res.data;
            const student = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message,
                    msg_type: "success"
                }
            })

            return dispatch({
                type: EDIT_STUDENT,
                payload: {
                    student
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const deleteStudent = (deletedStudent) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(getDeleteStudentURL(deletedStudent._id))
            const {
                data,
                success,
                message
            } = res.data;
            const student = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message,
                    msg_type: "success"
                }
            })

            return dispatch({
                type: DELETE_STUDENT,
                payload: {
                    student
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const studentLogin = (studentAccount) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(studentLoginURL, studentAccount)
            const {
                data,
                success,
                message
            } = res.data;
            const {token} = res.data;
            const user_id = data._id;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            if (data === null) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: "Wrong email or password",
                        msg_type: "danger"
                    }
                })
            }

            return dispatch({
                type: USER_LOGIN,
                payload: {
                    user_id,
                    token,
                    date: Date.now()
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}

export const studentChangePassword = (updatedStudentID, oldPassword, newPassword) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getStudentChangePasswordURL(updatedStudentID), {oldPassword, newPassword})
            const {
                data,
                success,
                message
            } = res.data;
            const student = data;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message,
                        msg_type: "danger"
                    }
                })
            }

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message,
                    msg_type: "success"
                }
            })

            return dispatch({
                type: STUDENT_CHANGE_PASSWORD,
                payload: {
                    student
                }
            })
        } catch (error) {
            return dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: error.response.data.message,
                    msg_type: "danger"
                }
            })
        }
    }
}