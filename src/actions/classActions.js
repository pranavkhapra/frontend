import {
    ADD_CLASS,
    DELETE_CLASS,
    EDIT_CLASS,
    GET_ALL_CLASSES,
    GET_CLASSES_BY_NAME,
    GET_CLASS_BY_ID,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from "../actions/types";
import axios from "axios";
import {
    addClassURL,
    allClassesURL,
    getClassByIDURL,
    getClassesByNameURL,
    getDeleteClassURL,
    getEditClassURL
} from "../config/routes";

export const getAllClasses = () => {
    return async (dispatch) => {
        try {
            let classes = [];
            const res = await axios.get(allClassesURL)
            const {
                data,
                success,
                message
            } = res.data;
            classes = data

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
                type: GET_ALL_CLASSES,
                payload: {
                    classes
                }
            })
        } catch (error) {
            console.log(error)
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

export const getClassByID = (class_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getClassByIDURL(class_id))
            const {
                data,
                success,
                message
            } = res.data;
            const classItem = data;

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
                type: GET_CLASS_BY_ID,
                payload: {
                    classItem,
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

export const getClassesByName = (class_name) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getClassesByNameURL(class_name))
            const {
                data,
                success,
                message
            } = res.data;
            const classes = data;

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
                type: GET_CLASSES_BY_NAME,
                payload: {
                    classes,
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

export const addClass = (newClass) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(addClassURL, newClass)
            const {
                data,
                success,
                message
            } = res.data;
            const classItem = data;

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
                type: ADD_CLASS,
                payload: {
                    classItem
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

export const editClass = (updatedClass) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getEditClassURL(updatedClass._id), updatedClass)
            const {
                data,
                success,
                message
            } = res.data;
            const classItem = data;

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
                type: EDIT_CLASS,
                payload: {
                    classItem
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

export const deleteClass = (deletedClassID) => {
    console.log(deletedClassID)
    return async (dispatch) => {
        try {
            const res = await axios.delete(getDeleteClassURL(deletedClassID))
            const {
                data,
                success,
                message
            } = res.data;

            console.log(data)

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
                type: DELETE_CLASS,
                payload: {
                    deletedClassID
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
