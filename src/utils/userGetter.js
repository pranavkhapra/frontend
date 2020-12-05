import axios from "axios";
import {
    getTeacherByIDURL,
    getStudentByIDURL,
    getAdminByIDURL
} from "../config/routes";

export const userGetter = async (user_id) => {
    let user = null;

    if (user_id == null || user_id == undefined){
        return {};
    }

    let res = await axios.get(getTeacherByIDURL(user_id));
    user = res.data.data;

    if (user == null) {
        let res = await axios.get(getStudentByIDURL(user_id));
        user = res.data.data;
    }

    if (user == null) {
        let res = await axios.get(getAdminByIDURL(user_id));
        user = res.data.data;
    }

    return user;
}