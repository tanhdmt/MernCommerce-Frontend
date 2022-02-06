import { combineReducers } from "redux";
// import { persistStore, persistReducer } from 'redux-persist';
import user from "./userReducer";
import product from "./productReducer";
import category from "./categoryReducer";
import cart from "./cartReducer";
import order from "./orderReducer";
import image from "./imageReducer";
import page from "./pageReducer";

const rootReducer = combineReducers({
    user,
    product,
    category,
    cart,
    order,
    image,
    page,
});

export default rootReducer;
