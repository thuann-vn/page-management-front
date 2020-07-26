import { FacebookService } from "../../services/facebook";

//Action names
export const FETCH_THREAD_MESSAGES = 'FETCH_THREAD_MESSAGES'

export const fetchThreadMessages = (threadId, messages) => {
    return {
        type: FETCH_THREAD_MESSAGES,
        payload: {
            id: threadId,
            messages
        }
    }
};

export const getThreadMessagesFromAPI = (threadId) => {
    console.log(threadId);
    return dispatch => {
        FacebookService.messages(threadId)
            .then(
                result => { 
                    console.log(result);
                    if(result && result.data){
                        dispatch(fetchThreadMessages(threadId, result.data));
                    }
                }
            );
    };
}