import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    page: 1,
    wordsList: [],
    fetchWordLoading: false,
    fetchWordError: null,
    addWordLoading: false,
    addWordError: "hello",
    wordAdded: false,
};

const addWordStart = (state, action) => {
    return updateObject(state, { error: null, addWordLoading: true });
};

const addWordSuccess = (state, action) => {
    return updateObject(state, {
        error: false,
        addWordLoading: false,
        wordAdded: true,
    });
};

const addWordFail = (state, action) => {
    return updateObject(state, {
        addWordError: action.error,
        addWordLoading: false,
    });
};

const resetAdded = (state, action) => {
    return updateObject(state, {
        wordAdded: false,
    });
};

const fetchWordStart = (state, action) => {
    return updateObject(state, { fetchWordError: null, fetchWordLoading: false });
};

const fetchWordSuccess = (state, action) => {
    return updateObject(state, {
        wordsList: action.data,
        fetchWordLoading: false,
        fetchWordError: null,
    });
};

const fetchWordFail = (state, action) => {
    return updateObject(state, {
        fetchWordLoading: false,
        fetchWordError: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_WORD_START:
            return addWordStart(state, action);
        case actionTypes.ADD_WORD_SUCCESS:
            return addWordSuccess(state, action);
        case actionTypes.ADD_WORD_FAIL:
            return addWordFail(state, action);
        case actionTypes.RESET_ADDED:
            return resetAdded(state, action);
        case actionTypes.WORD_FETCH_START:
            return fetchWordStart(state, action);
        case actionTypes.WORD_FETCH_SUCCESS:
            return fetchWordSuccess(state, action);
        case actionTypes.WORD_FETCH_FAIL:
            return fetchWordFail(state, action);
        default:
            return state;
    }
};

export default reducer;
