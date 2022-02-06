import { PAGES_LIST, SET_PAGE } from "../../constants/pageConstant";
import * as _state from "../states/pageState";


const pageReducer = (state = _state.pageState, action: any) => {
    switch (action.type) {
        case PAGES_LIST: {
            return {
                ...state,
                pages_list: action.payload,
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                page: action.payload,
            }
        }
        default:
            return state;
    }
};
export default pageReducer;