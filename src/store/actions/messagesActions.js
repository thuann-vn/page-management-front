import { FacebookService } from "../../services/facebook";
import { v4 as uuidv4 } from 'uuid';

//Action names
export const FETCH_THREAD_MESSAGES = 'FETCH_THREAD_MESSAGES'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

export const fetchThreadMessages = (threadId, messages, page) => {
    return {
        type: FETCH_THREAD_MESSAGES,
        payload: {
            id: threadId,
            messages,
            page
        }
    }
};

export const getThreadMessagesFromAPI = (threadId, page = 1, callback) => {
    return dispatch => {
        FacebookService.messages(threadId, page)
            .then(result => { 
                    if(result && result.data){
                        dispatch(fetchThreadMessages(threadId, result.data, page));
                        callback && callback(result);
                    }
                }
            );
    };
}

export const sendMessage = (thread, message) => {
    const uuid = uuidv4();
    const data = {
        uuid,
        thread,
        message
    }
    return {
        type: SEND_MESSAGE,
        payload: data
    }
};

export const sendMessageFailed = (data)=>{
    return {
        type: SEND_MESSAGE_FAILED,
        payload: {
            uuid: data.uuid,
            threadId: data.thread.id
        }
    }
}

export const sendMessageToApi = (data) => {
    return dispatch => {
        FacebookService.sendMessage(data)
            .then(
                result => { 
                    if(result && result.success){
                        dispatch({
                            type: SEND_MESSAGE_SUCCESS,
                            payload: {
                                uuid: data.uuid,
                                threadId: data.thread.id,
                                message: result.data
                            }
                        });
                    }else{
                        dispatch(sendMessageFailed(data));
                    }
                }
            ).catch(()=>{
                dispatch(sendMessageFailed(data));
            });
    };
}

export const receiveMessage = (threadId, message)=>{
    return {
        type: RECEIVE_MESSAGE,
        payload: {
            message,
            threadId
        }
    }
}