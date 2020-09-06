import { FETCH_THREAD_MESSAGES, SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILED, RECEIVE_MESSAGE } from '../actions/messagesActions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THREAD_MESSAGES:
            var threadId = action.payload.id;
            var page = action.payload.page;
            var messages = action.payload.messages;
            if(threadId){
                if(page == 1){
                    state[threadId] = [...messages] 
                }else{
                    if(state[threadId]){
                        state[threadId] = [
                            ...messages,
                            ...state[threadId]
                        ]
                    }else{
                        state[threadId] = [
                            ...messages
                        ]
                    }
                }
            }  
            return state;
        case RECEIVE_MESSAGE:
            var message = action.payload.message;
            var threadId = action.payload.threadId;
            var index = state[threadId].findIndex(item => item.id == message.id);
            if(index == -1){
                state[threadId] = [...state[threadId], message];
            }
            return state;
        case SEND_MESSAGE:
            var message = action.payload.message;
            var threadId = action.payload.thread.id;
            var uuid = action.payload.uuid;
            state[threadId] = [
                ...state[threadId],
                {
                    message: message,
                    id: uuid,
                    isSending: true
                }
            ]
            return state;
        case SEND_MESSAGE_SUCCESS:
            var message = action.payload.message;
            var threadId = action.payload.threadId;
            var uuid = action.payload.uuid;
            console.log(message, threadId, uuid);
            state[threadId] = state[threadId].map((item)=>{
                if(item.id == uuid){
                    console.log('AHIHI');
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