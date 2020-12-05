import {
    ADD_TEACHER,
    DELETE_TEACHER,
    EDIT_TEACHER,
    GET_ALL_TEACHERS,
    GET_TEACHERS_BY_NAME,
    GET_TEACHER_BY_ID,
    SET_MESSAGE,
    USER_LOGIN,
    TEACHER_CHANGE_PASSWORD
} from "./types";
import axios from "axios";
import {
    addTeacherURL,
    allTeachersURL,
    getDeleteTeacherURL,
    getEditTeacherURL,
    getTeacherByIDURL,
    getTeachersByNameURL,
    teacherLoginURL,
    getTeacherChangePasswordURL
} from "../config/routes";

export const getAllTeachers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(allTeachersURL)
            const {
                data,
                success,
                message
            } = res.data;
            const teachers = data;

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
                type: GET_ALL_TEACHERS,
                payload: {
                    teachers,
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

export const getTeacherByID = (teacher_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getTeacherByIDURL(teacher_id))
            const {
                data,
                success,
                message
            } = res.data;
            const teacher = data;

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
                type: GET_TEACHER_BY_ID,
                payload: {
                    teacher,
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

export const getTeachersByName = (teacher_name) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getTeachersByNameURL(teacher_name))
            const {
                data,
                success,
                message
            } = res.data;
            const teachers = data;

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
                type: GET_TEACHERS_BY_NAME,
                payload: {
                    teachers,
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

export const addTeacher = (newTeacher) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(addTeacherURL, newTeacher)
            
            const {
                data,
                success,
                message
            } = res.data;
            const teacher = data;

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
                type: ADD_TEACHER,
                payload: {
                    teacher
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

export const editTeacher = (updatedTeacher) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getEditTeacherURL(updatedTeacher._id), updatedTeacher)
            const {
                data,
                success,
                message
            } = res.data;
            const teacher = data;

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
                type: EDIT_TEACHER,
                payload: {
                    teacher
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

export const deleteTeacher = (deletedTeacher) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(getDeleteTeacherURL(deletedTeacher._id))
            const {
                data,
                success,
                message
            } = res.data;
            const teacher = data;

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
                type: DELETE_TEACHER,
                payload: {
                    teacher
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

export const teacherLogin = (teacherAccount) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(teacherLoginURL, teacherAccount)
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

export const teacherChangePassword = (updatedTeacherID, oldPassword, newPassword) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getTeacherChangePasswordURL(updatedTeacherID), {oldPassword, newPassword})
            const {
                data,
                success,
                message
            } = res.data;
            const teacher = data;

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
                type: TEACHER_CHANGE_PASSWORD,
                payload: {
                    teacher
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