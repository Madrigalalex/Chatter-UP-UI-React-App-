import {SET_CHITCHATS, LOADING_DATA, LIKE_CHITCHAT, UNLIKE_CHITCHAT, DELETE_CHITCHAT, SET_ERRORS, POST_CHITCHAT, CLEAR_ERRORS, LOADING_UI, SET_CHITCHAT, STOP_LOADING_UI, SUBMIT_COMMENT} from '../types';
import axios from 'axios';

//Get all chitchats
export const getChitChats = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
        axios.get('/chitchat')
            .then(res => {
                dispatch({
                    type: SET_CHITCHATS,
                    payload: res.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: SET_CHITCHATS,
                    payload: []
                });
            });
};

//Submit a comment
export const submitComment = (chitchatId, commentData) => (dispatch) => {
    axios.post(`/chitchat/${chitchatId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors());
})
.catch(err => {
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data

    })
})

}

//Like a chitchat
export const likeChitChat = (chitchatId) => (dispatch) => {
    axios.get(`/chitchat/${chitchatId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_CHITCHAT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//Unlike a chitchat
export const unlikeChitChat = (chitchatId) => (dispatch) => {
    axios.get(`/chitchat/${chitchatId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_CHITCHAT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//Delete chitchat
export const deleteChitChat = (chitchatId) => (dispatch) => {
    axios.delete(`/chitchat/${chitchatId}`)
        .then(() =>{
            dispatch({type: DELETE_CHITCHAT, payload: chitchatId})
        })
        .catch(err => console.log(err));
}

//Post a chitchat
export const postChitChat = (newChitChat) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/chitchat', newChitChat)
        .then((res) => {
            dispatch({
                type: POST_CHITCHAT,
                payload: res.data
            })
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//Clear error in postchitchat
export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}

//Get chitchat
export const getChitChat = (chitchatId) => (dispatch) => {
    dispatch({type: LOADING_UI});
        axios.get(`/chitchat/${chitchatId}`)
            .then((res) => {
                dispatch({
                    type: SET_CHITCHAT,
                    payload: res.data
                });
                dispatch({type: STOP_LOADING_UI})
            })
            .catch((err) => console.log(err));
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
        axios
        .get(`/user/${userHandle}`)
         .then((res) => {
            dispatch({
                type: SET_CHITCHATS,
                payload: res.data.chitchats
            });
        })
            .catch(()=> {
            dispatch({
                type: SET_CHITCHATS,
                payload: null
                });
            });
};
