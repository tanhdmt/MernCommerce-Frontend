import api from "../../api";
import { DELETE_ALL_CART } from "../../constants/cartConstant";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_TRASH_FAIL,
    ORDER_LIST_TRASH_REQUEST,
    ORDER_LIST_TRASH_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_STATUS_FAIL,
    ORDER_STATUS_REQUEST,
    ORDER_STATUS_SUCCESS,
} from "../../constants/orderConstant";
import { Dispatch } from "redux";

export const createOrder = (order: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        if (order.paymentMethod === "cash") {
            alert(
                "Bạn đã đặt hàng thành công"
            );
            await api.patch("/api/product/decrease-qty", order);
            const { data } = await api.post("/api/order", order);
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        } else {
            const { data } = await api.post("/api/order", order);
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        }
        dispatch({ type: DELETE_ALL_CART });
        localStorage.removeItem("persist:root");
    } catch (e: any) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const detailsOrder =
    (orderId: string | number) => async (dispatch: Dispatch) => {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        try {
            const { data } = await api.get(`/api/order/${orderId}`);
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        } catch (e: any) {
            const message =
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message;
            dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
        }
    };

export const payOrder =
    (order: any, paymentResult: any) => async (dispatch: Dispatch) => {
        dispatch({
            type: ORDER_PAY_REQUEST,
            payload: { order, paymentResult },
        });
        try {
            // await api.patch('/api/product/decrease-qty', order);
            const { data } = await api.put(
                `/api/order/${order._id}/pay`,
                paymentResult
            );
            dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        } catch (e: any) {
            const message =
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message;
            dispatch({ type: ORDER_PAY_FAIL, payload: message });
        }
    };

export const deliveredOrder = (order: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_DELIVERED_REQUEST, payload: { order } });
    try {
        const { data } = await api.put(
            `/api/order/${order.id}/delivered`,
            order
        );
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_DELIVERED_FAIL, payload: message });
    }
};

export const statusOrder = (order: any) => async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_STATUS_REQUEST, payload: { order } });
    try {
        const { data } = await api.patch(
            `/api/order/${order.id}/status`,
            order
        );
        dispatch({ type: ORDER_STATUS_SUCCESS, payload: data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_STATUS_FAIL, payload: message });
    }
};

export const listOrderMine = () => async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) return;
    const user = JSON.parse(userInfo)._id;
    try {
        const { data } = await api.get(`/api/order/${user}/mine`);
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};

export const listOrder = () => async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    try {
        const { data } = await api.get(`/api/order/`);
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
};

export const listTrashOrders = () => async (dispatch: Dispatch) => {
    dispatch({ type: ORDER_LIST_TRASH_REQUEST });
    try {
        const res = await api.get("api/order/trash");
        dispatch({ type: ORDER_LIST_TRASH_SUCCESS, payload: res.data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: ORDER_LIST_TRASH_FAIL, payload: message });
    }
};

export const deleteOrders = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/order", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/orders";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyOrders = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/order/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/orders/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const restoreOrders = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/order/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/orders/trash";
        }
    } catch (e) {
        console.log(e);
    }
};
