import * as _state from "../states/productState";
import {
    PRODUCTS_LIST,
    COLORS_LIST,
    SIZES_LIST,
    SET_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    PRODUCTS_SEARCH,
} from "../../constants/productConstant";

const productReducer = (state = _state.productState, action: any) => {
    switch (action.type) {
        case PRODUCTS_LIST: {
            return {
                ...state,
                products_list: action.payload,
            };
        }
        case PRODUCTS_SEARCH: {
            return {
                ...state,
                products_search: action.payload,
            };
        }
        case COLORS_LIST: {
            return {
                ...state,
                colors_list: action.payload,
            };
        }
        case SIZES_LIST: {
            return {
                ...state,
                sizes_list: action.payload,
            };
        }
        case SET_PRODUCT: {
            return {
                ...state,
                product: action.payload,
            };
        }
        case SET_COLOR: {
            return {
                ...state,
                color: action.payload,
            };
        }
        case SET_SIZE: {
            return {
                ...state,
                size: action.payload,
            };
        }

        default:
            return state;
    }
};
export default productReducer;
