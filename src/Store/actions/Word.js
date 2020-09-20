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
    console.log("reser")
    return {
        type: actionTypes.RESET_ADDED,
    };
}
export const addWord = (word) => {
    return (dispatch) => {
        dispatch(addWordStart());
        let url = `http://localhost:5000/graphql/addWord`;
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
                // console.log(err)
                dispatch(addWordFail(err.response.data.errors[0]));
            });
    };
};


export const fetchWord = () => {
console.log("*************///*/*")
    return (dispatch) => {
        dispatch(fetchWordStart());
        let url = `http://localhost:5000/graphql/getAllAddedWords`;
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
                // console.log(err.response.data.errors[0])
                dispatch(fetchWordFail(err.response.data.errors[0]));
            });
    };

}