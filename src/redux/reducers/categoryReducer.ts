import * as _state from "../states/categoryState";
import { CATE_LIST, SET_CATE } from "../../constants/categoryConstant";

const categoryReducer = (state= _state.categoryState, action: any) => {
    switch (action.type) {
        case CATE_LIST:{
            return{
                ...state,
                categories: action.payload,
            };
        }
        case SET_CATE:{
            return{
                ...state,
                category: action.payload,
            };
        }
        default:
            return state;
    }
}
export default categoryReducer;
