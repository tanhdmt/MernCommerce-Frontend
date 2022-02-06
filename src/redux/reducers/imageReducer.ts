import { IMAGES, SET_IMAGE } from "../../constants/imageConstant";
import * as _state from "../states/imageState";

const imageReducer = (state = _state.imageState, action: any) => {
    switch (action.type) {
        case IMAGES: {
            return {
                ...state,
                images: action.payload,
            };
        }
        case SET_IMAGE: {
            return {
                ...state,
                image: action.payload,
            };
        }
        default:
            return state;
    }
};
export default imageReducer;
