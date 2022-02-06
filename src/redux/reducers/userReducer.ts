import * as _state from "../states/userState";
import {
    REMOVE_USER,
    SET_USER,
    SET_ROLE,
    SET_USERS,
    USER_LOGIN_FAIL,
    RESET_MESSAGE,
} from "../../constants/userConstant";

const userReducer = (state = _state.userState, action: any) => {
    switch (action.type) {
        case RESET_MESSAGE: {
            return {
                ...state,
                message_login_fail: "",
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.payload,
            };
        }
        case SET_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case SET_ROLE: {
            return {
                ...state,
                isAdmin: action.payload,
            };
        }
        case REMOVE_USER: {
            return {
                ...state,
                isAdmin: false,
            };
        }
        case USER_LOGIN_FAIL: {
            return {
                ...state,
                message_login_fail: action.payload,
            };
        }
        default:
            return state;
    }
};

export default userReducer;
