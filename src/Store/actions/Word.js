import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const addWordStart = () => {
    return {
        type: actionTypes.ADD_WORD_START,
    };
};

export const addWordSuccess = () => {
    return {
        type: actionTypes.ADD_WORD_SUCCESS,
    };
};

export const addWordFail = (error) => {
    return {
        type: actionTypes.ADD_WORD_FAIL,
        error: error,
    };
};


export const fetchWordStart = () => {
    return {
        type: actionTypes.WORD_FETCH_START,
    };
};

export const fetchWordSuccess = (data) => {
    return {
        type: actionTypes.WORD_FETCH_SUCCESS,
        data:data

    };
};

export const fetchWordFail = (error) => {
    return {
        type: actionTypes.WORD_FETCH_FAIL,
        error: error,
    };
};

export const resetWordAdded = ()=>{
    return {
        type: actionTypes.RESET_ADDED,
    };
}
export const addWord = (word) => {
    return (dispatch) => {
        dispatch(addWordStart());
        let url = `https://dictionary-my.herokuapp.com/graphql/addWord`;
        Axios.post(url, {
            query: `mutation{
                addWord(userInput:{word:"${word}"}){
                  _id
                  key
                  lexicalEntries{
                    lexicalCategory
                    example
                    origin
                    example
                  }
                }
              }`,
        })
            .then((response) => {
                dispatch(addWordSuccess());
            })
            .catch((err) => {
                dispatch(addWordFail(err.response.data.errors[0]));
            });
    };
};


export const fetchWord = () => {
    return (dispatch) => {
        dispatch(fetchWordStart());
        let url = `https://dictionary-my.herokuapp.com/graphql/getAllAddedWords`;
        Axios.post(url, {
            query: `query{
                getAllAddedWords{
                  data{
                    _id
                    key
                    lexicalEntries{
                      lexicalCategory
                      definition
                      example
                      origin
                    }
                  }
                }
              }`,
        })
            .then((response) => {
                dispatch(fetchWordSuccess(response.data.data.getAllAddedWords.data));
            })
            .catch((err) => {
                let error = null;
                if(err.response.data){
                    error=err.response.data.errors[0]
                }
                dispatch(fetchWordFail(error));
            });
    };

}