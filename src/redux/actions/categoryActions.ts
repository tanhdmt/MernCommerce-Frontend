import api from "../../api";
import { CATE_LIST, SET_CATE } from "../../constants/categoryConstant";
import { Dispatch } from "redux";

//GET ACTIONS BEGIN
export const getCategories = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/category");
        dispatch({ type: CATE_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getCategory =
    (id: string | number) => async (dispatch: Dispatch) => {
        try {
            const res = await api.get("api/category/" + id + "/edit");
            dispatch({ type: SET_CATE, payload: res.data });
        } catch (e) {
            console.log(e);
        }
    };

export const getTrashCategories = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/category/trash");
        dispatch({ type: CATE_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const addCategory = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isSuccess = await api.post("api/category/add", data);
        if (isSuccess) {
            console.log(isSuccess.data);
            console.log("success");
            document.location.href = "/admin/categories";
        }
    } catch (e) {
        console.log(e);
    }
};

export const addCategoryAndContinue =
    (data: any) => async (dispatch: Dispatch) => {
        try {
            const isSuccess = await api.post("api/category/add", data);
            if (isSuccess) {
                console.log("success");
            }
        } catch (e) {
            console.log(e);
        }
    };

export const postImgCategory = (data: any) => async (dispatch: Dispatch) => {
    try {
        await api.post("api/category/imageCategory", data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deleteCategories = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/category", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/categories";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyCategories = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/category/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/categories/trash";
        }
    } catch (e) {
        console.log(e);
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreCategories = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/category/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/categories/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const activeCategories = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isActive = await api.patch("api/category/" + data);
        if (isActive) {
            document.location.href = "/admin/categories";
        }
    } catch (e) {
        console.log(e);
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateCategory = (category: any) => async (dispatch: Dispatch) => {
    try {
        const data = await api.put(
            `api/category/${category.id}`,
            category.formData
        );
        if (data) {
            console.log(data.data);
            document.location.href = "/admin/categories";
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
