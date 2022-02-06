import * as _state from "../states/cartState";
import {
    ADD_CART,
    DECREASE_QUANTITY,
    DELETE_CART,
    DELETE_ALL_CART,
    GET_NUMBER_CART,
    INCREASE_QUANTITY,
} from "../../constants/cartConstant";
import { Cart } from "type";
const cartReducer = (state = _state.cartState, action: any) => {
    switch (action.type) {
        case GET_NUMBER_CART:
            return {
                ...state,
            };
        case ADD_CART:
            let pricePro = action.payload.price;
            if (state.numberCart === 0) {
                if (action.payload.priceDiscount !== 0) {
                    pricePro = action.payload.priceDiscount;
                }
                // if (action.payload.quantity !== 0) {
                //     quantPro = action.payload.quantity;
                // }
                let cart: Cart = {
                    id: action.payload._id,
                    quantity: action.payload.getQty,
                    size: action.payload.size,
                    color: action.payload.color,
                    categoryId: action.payload.categoryId,
                    inStock: action.payload.quantity,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: pricePro,
                };
                state.carts.push(cart);
            } else {
                let check = false;
                state.carts.forEach((item, key) => {
                    if (item.id === action.payload._id) {
                        state.carts[key].quantity++;
                        check = true;
                    }
                });
                if (check === false) {
                    if (action.payload.priceDiscount !== 0) {
                        pricePro = action.payload.priceDiscount;
                    }
                    let cart: Cart = {
                        id: action.payload._id,
                        quantity: action.payload.getQty,
                        size: action.payload.size,
                        color: action.payload.color,
                        inStock: action.payload.quantity,
                        name: action.payload.name,
                        image: action.payload.image,
                        price: pricePro,
                    };
                    state.carts.push(cart);
                }
            }
            return {
                ...state,
                numberCart: state.carts.length,
                // numberCart: state.carts[action.payload].quantity
            };
        case INCREASE_QUANTITY:
            if (
                state.carts[action.payload].quantity <
                state.carts[action.payload].inStock
            ) {
                state.carts[action.payload].quantity++;
            }
            return {
                ...state,
            };
        case DECREASE_QUANTITY:
            let quantity = state.carts[action.payload].quantity;
            if (quantity > 1) {
                state.carts[action.payload].quantity--;
            }
            return {
                ...state,
            };
        case DELETE_CART:
            // let quantity_ = state.carts[action.payload].quantity;
            return {
                ...state,
                carts: state.carts.filter((item) => {
                    return item.id !== state.carts[action.payload].id;
                }),
                numberCart: state.carts.filter((item) => {
                    return item.id !== state.carts[action.payload].id;
                }).length,
            };
        case DELETE_ALL_CART:
            return {
                ...state,
                carts: [],
                numberCart: 0,
            };
        default:
            return state;
    }
};

export default cartReducer;
