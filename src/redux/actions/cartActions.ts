import {
    ADD_CART,
    DECREASE_QUANTITY,
    DELETE_CART,
    DELETE_ALL_CART,
    GET_NUMBER_CART,
    INCREASE_QUANTITY,
    UPDATE_CART,
} from "../../constants/cartConstant";
import { Dispatch } from "redux";

export const getNumberCart = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: GET_NUMBER_CART });
    } catch (e) {
        console.log(e);
    }
};

export const addCart = (payload: any) => async (dispatch: Dispatch) => {
    try {
        // console.log(payload)
        dispatch({ type: ADD_CART, payload });
    } catch (e) {
        console.log(e);
    }
};

export const updateCart = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: UPDATE_CART, payload });
    } catch (e) {
        console.log(e);
    }
};

export const deleteCart = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DELETE_CART, payload });
    } catch (e) {
        console.log(e);
    }
};

export const deleteAllCart = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DELETE_ALL_CART });
    } catch (e) {
        console.log(e);
    }
};

export const increaseQuantity =
    (payload: any) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: INCREASE_QUANTITY, payload });
        } catch (e) {
            console.log(e);
        }
    };

export const decreaseQuantity =
    (payload: any) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: DECREASE_QUANTITY, payload });
        } catch (e) {
            console.log(e);
        }
    };
