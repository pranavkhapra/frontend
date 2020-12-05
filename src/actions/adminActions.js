import {
    GET_ALL_ADMINS,
    GET_ADMIN_BY_ID,
    EDIT_ADMIN,
    ADD_ADMIN,
    SET_MESSAGE,
    USER_LOGIN,
    ADMIN_CHANGE_PASSWORD
} from "../actions/types";
import axios from "axios";
import {
    allAdminsURL,
    addAdminURL,
    getAdminByIDURL,
    getEditAdminURL,
    adminLoginURL,
    getAdminChangePasswordURL
} from "../config/routes";

export const getAllAdmins = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(allAdminsURL)
            const {
                data,
                success,
                message
            } = res.data;
            const admins = data;

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
                type: GET_ALL_ADMINS,
                payload: {
                    admins,
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

export const getAdminByID = (admin_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(getAdminByIDURL(admin_id))
            const {
                data,
                success,
                message
            } = res.data;
            const admin = data;

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
                type: GET_ADMIN_BY_ID,
                payload: {
                    admin,
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

export const addAdmin = (newAdmin) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(addAdminURL, newAdmin)
            const {
                data,
                success,
                message
            } = res.data;
            const admin = data;

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
                type: ADD_ADMIN,
                payload: {
                    admin,
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

export const editAdmin = (updatedAdmin) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getEditAdminURL(updatedAdmin._id), updatedAdmin)
            const {
                data,
                success,
                message
            } = res.data;
            const admin = data;

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
                type: EDIT_ADMIN,
                payload: {
                    admin,
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

export const adminLogin = (adminAccount) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(adminLoginURL, adminAccount)
            const {
                data,
                success,
                message,
            } = res.data;
            const {token} = res.data;
            const user_id = data._id;

            if (success === false) {
                return dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: "Wrong email or password",
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

export const adminChangePassword = (updatedAdminID, oldPassword, newPassword) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(getAdminChangePasswordURL(updatedAdminID), {oldPassword, newPassword})
            const {
                data,
                success,
                message
            } = res.data;
            const admin = data;

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
                type: ADMIN_CHANGE_PASSWORD,
                payload: {
                    admin
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
