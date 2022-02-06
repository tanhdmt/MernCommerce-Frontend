import api from "../../api";
import {
    REMOVE_USER,
    SET_USER,
    SET_ROLE,
    SET_USERS,
    USER_LOGIN_FAIL,
    RESET_MESSAGE,
} from "../../constants/userConstant";
import { Dispatch } from "redux";

//GET ACTION BEGIN
export const getUsers = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/user");
        dispatch({
            type: SET_USERS,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getUser = (id: string | number) => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/user/" + id + "/edit");
        dispatch({
            type: SET_USER,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashUsers = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/user/trash");
        dispatch({
            type: SET_USERS,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getRole = (data: any) => async (dispatch: Dispatch) => {
    try {
        const res = await api.post("api/user/userRole", { id: data });
        dispatch({
            type: SET_ROLE,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTION BEGIN

//POST ACTION BEGIN
export const register = (data: any) => async (dispatch: Dispatch) => {
    try {
        const res = await api.post("api/user/register", {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            sex: data.sex,
            address: data.address,
        });
        console.log(res);
        localStorage.setItem("userInfo", JSON.stringify(res.data.info));
        localStorage.setItem("message-user", JSON.stringify(res.data.message));
        dispatch({
            type: SET_USER,
            payload: res.data.info,
        });
        document.location.href = "/";
    } catch (e) {
        console.log(e);
    }
};

export const login = (data: any) => async (dispatch: Dispatch) => {
    try {
        const res = await api.post("api/user/login", {
            email: data.email,
            password: data.password,
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data.info));
        localStorage.setItem("message-user", JSON.stringify(res.data.message));
        dispatch({
            type: SET_USER,
            payload: res.data.info,
        });
        document.location.href = "/";
    } catch (error: any) {
        console.log(error.response);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message,
        });
        localStorage.setItem(
            "message-user_error",
            JSON.stringify(error.response.data)
        );
    } finally {
        dispatch({ type: RESET_MESSAGE });
    }
};
//POST ACTION END

//LOGOUT ACTION
export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("persist:root");
    localStorage.setItem(
        "message-user",
        JSON.stringify({ message: "Đăng xuất thành công!" })
    );
    dispatch({ type: REMOVE_USER });
    document.location.href = "/";
};

//DELETE ACTION BEGIN
export const deleteUsers = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/user", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/users";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyUsers = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/user/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/users/trash";
        }
    } catch (e) {
        console.log(e);
    }
};
//DELETE ACTION END

//RESTORE ACTION
export const restoreUsers = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/user/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/users/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

//PUT ACTION
export const updateUser = (user: any) => async (dispatch: Dispatch) => {
    try {
        const data = await api.put(`api/user/${user.id}`, user);
        if (data) {
            console.log(data.data);
            document.location.href = "/admin/users";
        }
    } catch (e) {
        console.log(e);
    }
};
