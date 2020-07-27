import { FETCH_THREAD_MESSAGES, SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILED, RECEIVE_MESSAGE } from '../actions/messagesActions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THREAD_MESSAGES:
            var threadId = action.payload.id;
            state[threadId] = [...action.payload.messages]   
            return state;
        case RECEIVE_MESSAGE:
            var message = action.payload.message;
            var threadId = action.payload.threadId;
            state[threadId] = [...state[threadId], message];
            return state;
        case SEND_MESSAGE:
            var message = action.payload.message;
            var threadId = action.payload.thread.id;
            var uuid = action.payload.uuid;
            state[threadId].push({
                message: message,
                id: uuid
            });
            return state;
        case SEND_MESSAGE_SUCCESS:
            var message = action.payload.message;
            var threadId = action.payload.threadId;
            var uuid = action.payload.uuid;
            state[threadId] = state[threadId].map((item)=>{
                if(item.id == uuid){
                    return message;
                }
                return item;
            });
            return state;
        case SEND_MESSAGE_FAILED:
            var threadId = action.payload.threadId;
            var uuid = action.payload.uuid;
            state[threadId] = state[threadId].map((item)=>{
                if(item.id == uuid){
                    item.sendFailed = true;
                }
                return item;
            });
            return state;
        default:
            return state;
    }
};

export default messagesReducer