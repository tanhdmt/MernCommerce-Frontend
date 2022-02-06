import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_RESET,
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
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_STATUS_FAIL,
    ORDER_STATUS_REQUEST,
    ORDER_STATUS_RESET,
    ORDER_STATUS_SUCCESS,
} from "../../constants/orderConstant";
import * as _state from "../states/orderState";

const orderReducer = (state = _state.orderState, action: any) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {

            }
        //Order Details
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //Order Pay
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {
            }
        //Order Delivered
        case ORDER_DELIVERED_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DELIVERED_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case ORDER_DELIVERED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_DELIVERED_RESET:
            return {
            }
        //Order Status
        case ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case ORDER_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_STATUS_RESET:
            return {
            }
        //Order List Mine
        case ORDER_MINE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_MINE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case ORDER_MINE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //Order List
        case ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //Order List Trash
        case ORDER_LIST_TRASH_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_LIST_TRASH_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_TRASH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default orderReducer
