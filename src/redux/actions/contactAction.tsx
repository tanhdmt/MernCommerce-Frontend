import api from "../../api";
import {
    CONTACT_CREATE_FAIL,
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_DETAILS_FAIL,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_LIST_FAIL,
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_REPLY_FAIL,
    CONTACT_REPLY_REQUEST,
    CONTACT_REPLY_SUCCESS,
    CONTACT_TRASH_LIST_FAIL,
    CONTACT_TRASH_LIST_REQUEST,
    CONTACT_TRASH_LIST_SUCCESS,
} from "../../constants/contactConstant";
import { Dispatch } from "redux";

export const createContact = (contact: any) => async (dispatch: Dispatch) => {
    dispatch({ type: CONTACT_CREATE_REQUEST, payload: contact });
    try {
        const { data } = await api.post("/api/contact", contact);
        dispatch({ type: CONTACT_CREATE_SUCCESS, payload: data });
    } catch (e: any) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const detailsContact =
    (contactId: string) => async (dispatch: Dispatch) => {
        dispatch({ type: CONTACT_DETAILS_REQUEST, payload: contactId });
        try {
            const { data } = await api.get(`/api/contact/${contactId}/edit`);
            dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
        } catch (e: any) {
            const message =
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message;
            dispatch({ type: CONTACT_DETAILS_FAIL, payload: message });
        }
    };

export const listContact = () => async (dispatch: Dispatch) => {
    dispatch({ type: CONTACT_LIST_REQUEST });
    try {
        const { data } = await api.get(`/api/contact/`);
        dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_LIST_FAIL, payload: message });
    }
};

export const listTrashContact = () => async (dispatch: Dispatch) => {
    dispatch({ type: CONTACT_TRASH_LIST_REQUEST });
    try {
        const { data } = await api.get(`/api/contact/trash`);
        dispatch({ type: CONTACT_TRASH_LIST_SUCCESS, payload: data });
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_TRASH_LIST_FAIL, payload: message });
    }
};

export const sendReply = (contact: any) => async (dispatch: Dispatch) => {
    dispatch({ type: CONTACT_REPLY_REQUEST, payload: { contact } });
    try {
        const { data } = await api.put(`/api/contact/${contact._id}`, contact);
        console.log(data);
        dispatch({ type: CONTACT_REPLY_SUCCESS, payload: data });
        document.location.href = "/admin/contacts";
    } catch (e: any) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: CONTACT_REPLY_FAIL, payload: message });
    }
};

export const deleteContacts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/contact", { data: ids });
        if (isDeleted) {
            document.location.href = "/admin/contacts";
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyContacts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/contact/force", { data: ids });
        if (isDestroy) {
            document.location.href = "/admin/contacts/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const restoreContacts = (data: any) => async (dispatch: Dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/contact/restore", {
            data: ids.id.split(","),
        });
        if (isRestore) {
            document.location.href = "/admin/contacts/trash";
        }
    } catch (e) {
        console.log(e);
    }
};

export const activeContacts = (data: string) => async (dispatch: Dispatch) => {
    try {
        await api.patch("api/contact/" + data);
    } catch (e) {
        console.log(e);
    }
};
