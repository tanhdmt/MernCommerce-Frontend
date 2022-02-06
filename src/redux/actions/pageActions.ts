import api from "../../api";
import { PAGES_LIST, SET_PAGE } from "../../constants/pageConstant";
import { Dispatch } from "redux";

//GET ACTIONS BEGIN

export const getPages = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/page");
        dispatch({ type: PAGES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getPageSlug = (slug: string) => async (dispatch: Dispatch) => {
    try {
        const res = await api.get(`api/page/${slug}`);
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getPage = (id: string | number) => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/page/" + id + "/edit");
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashPages = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/page/trash");
        dispatch({ type: SET_PAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const addPage = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isSucc = await api.post("api/page/add", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
};

export const addPageAndContinue = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isSucc = await api.post("api/page/add", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
        }
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deletePages = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/page", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyPages = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/page/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/pages/trash";
        }
    } catch (e) {
        console.log(e);
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restorePages = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/page/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/pages/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const activePages = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isActive = await api.patch("api/page/" + data);
        if (isActive) {
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updatePage = (page: any) => async (dispatch: Dispatch) => {
    try {
        const isSucc = await api.put(`api/page/${page.id}`, page.formData);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/pages";
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
