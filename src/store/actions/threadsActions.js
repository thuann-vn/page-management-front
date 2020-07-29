import { FacebookService } from "../../services/facebook";

//Action names
export const FETCH_THREADS = 'FETCH_THREADS'
export const THREAD_CHANGED = 'THREAD_CHANGED'

export const fetchThreads = (threads) => {
    return {
        type: FETCH_THREADS,
        payload: threads
    }
};

export const getThreadFromApi = (pageId) => {
    return dispatch => {
        FacebookService.threads(pageId)
            .then(
                result => { 
                    if(result && result.length){
                        console.log(result)
                        dispatch(fetchThreads(result));
                    }
                }
            );
    };
}

export const threadChanged = (thread) => {
    return {
        type: THREAD_CHANGED,
        payload: thread
    }
};