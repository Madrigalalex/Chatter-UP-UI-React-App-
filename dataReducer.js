import {SET_CHITCHATS, LIKE_CHITCHAT, UNLIKE_CHITCHAT, LOADING_DATA, DELETE_CHITCHAT, POST_CHITCHAT, SET_CHITCHAT, SUBMIT_COMMENT} from '../types';

const initialState ={
    chitchats: [],
    chitchat: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_CHITCHATS:
            return {
                ...state,
                chitchats: action.payload,
                loading: false
            };
        case SET_CHITCHAT:
            return{
                ...state,
                chitchat: action.payload
            };
        case LIKE_CHITCHAT:
        case UNLIKE_CHITCHAT:
            let index = state.chitchats.findIndex((chitchat) => chitchat.chitchatId === action.payload.chitchatId);
            state.chitchats[index] = action.payload;
            if (state.chitchat.chitchatId === action.payload.chitchatId){
                state.chitchat = action.payload;
            }
           
            return {
                ...state
            };

        case DELETE_CHITCHAT:
            index = state.chitchats.findIndex((chitchat) => chitchat.chitchatId === action.payload);
            state.chitchats.splice(index, 1);
            return {
                ...state
            };
        case POST_CHITCHAT:
            return{
                ...state,
                chitchats: [
                    action.payload,
                    ...state.chitchats
                ]
            }
        case SUBMIT_COMMENT:
            return{
                ...state,
                    chitchat: {
                        ...state.chitchat,
                        comments: [action.payload, ...state.chitchat.comments]
                    }
            };

        default:
            return state;
    }
}