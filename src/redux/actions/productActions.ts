import api from "../../api";
import {
    PRODUCTS_LIST,
    COLORS_LIST,
    SIZES_LIST,
    SET_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    PRODUCTS_SEARCH,
} from "../../constants/productConstant";
import { Dispatch } from "redux";

//GET ACTIONS BEGIN

export const getProducts = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/product");
        dispatch({ type: PRODUCTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getSearch = (search: string) => async (dispatch: Dispatch) => {
    try {
        const res = await api.get(`api/product/search?key=${search.trim()}`);
        dispatch({ type: PRODUCTS_SEARCH, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getColors = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/color");
        dispatch({ type: COLORS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getSizes = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/size");
        dispatch({ type: SIZES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getProduct =
    (id: string | number) => async (dispatch: Dispatch) => {
        try {
            const res = await api.get("api/product/" + id + "/edit");
            dispatch({ type: SET_PRODUCT, payload: res.data });
        } catch (e) {
            console.log(e);
        }
    };

export const getColor = (id: string | number) => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/color/" + id + "/edit");
        dispatch({ type: SET_COLOR, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getSize = (id: string | number) => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/size/" + id + "/edit");
        dispatch({ type: SET_SIZE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashColors = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/color/trash");
        dispatch({ type: COLORS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashProducts = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/product/trash");
        dispatch({ type: PRODUCTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashSizes = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.get("api/size/trash");
        dispatch({ type: SIZES_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTIONS END

//POST ACTIONS BEGIN
export const addProduct = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isSucc = await api.post("api/product/add", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/products";
        }
    } catch (e) {
        console.log(e);
    }
};

export const addProductAndContinue =
    (data: any) => async (dispatch: Dispatch) => {
        try {
            const isSucc = await api.post("api/product/add", data);
            if (isSucc) {
                console.log("success");
            }
        } catch (e) {
            console.log(e);
        }
    };

export const addColor = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isSucc = await api.post("api/color/add", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/colors";
        }
    } catch (e) {
        console.log(e);
    }
};

export const addColorAndContinue =
    (data: any) => async (dispatch: Dispatch) => {
        try {
            const isSucc = await api.post("api/color/add", data);
            if (isSucc) {
                console.log("success");
            }
        } catch (e) {
            console.log(e);
        }
    };

export const addSize = (data: any) => async (dispatch: Dispatch) => {
    try {
        // console.log(data);
        const isSucc = await api.post("api/size/add", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/sizes";
        }
    } catch (e) {
        console.log(e);
    }
};

export const addSizeAndContinue = (data: any) => async (dispatch: Dispatch) => {
    try {
        // console.log(data);
        const isSucc = await api.post("api/size/add", data);
        if (isSucc) {
            console.log("success");
        }
    } catch (e) {
        console.log(e);
    }
};

export const postImgProduct = (data: any) => async (dispatch: Dispatch) => {
    try {
        await api.post("api/product/imageProduct", data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deleteProducts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/product", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/products";
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteColors = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/color", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/colors";
        }
    } catch (e) {
        console.log(e);
    }
};

export const deleteSizes = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/size", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/sizes";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyProducts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/product/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/products/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyColors = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/color/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/colors/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroySizes = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/size/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/sizes/trash";
        }
    } catch (e) {
        console.log(e);
    }
};
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreProducts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/product/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/products/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const restoreColors = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/color/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/colors/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const restoreSizes = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/size/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/sizes/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const activeProducts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const isActive = await api.patch("api/product/" + data);
        if (isActive) {
            document.location.href = "/admin/products";
        }
    } catch (e) {
        console.log(e);
    }
};
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateProduct = (product: any) => async (dispatch: Dispatch) => {
    try {
        const isSucc = await api.put(
            `api/product/${product.id}`,
            product.formData
        );
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/products";
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateColor = (color: any) => async (dispatch: Dispatch) => {
    try {
        const data = await api.put(`api/color/${color.id}`, color);
        if (data) {
            document.location.href = "/admin/colors";
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateSize = (size: any) => async (dispatch: Dispatch) => {
    try {
        const data = await api.put(`api/size/${size.id}`, size);
        if (data) {
            document.location.href = "/admin/sizes";
        }
    } catch (e) {
        console.log(e);
    }
};
//PUT ACTION END
