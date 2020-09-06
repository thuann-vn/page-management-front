import { FacebookService } from "../../services/facebook";

//Action names
export const FETCH_THREADS = 'FETCH_THREADS'
export const THREAD_CHANGED = 'THREAD_CHANGED'

export const fetchThreads = (pageId, threads) => {
    return {
        type: FETCH_THREADS,
        payload: {
            pageId,
            data: threads
        }
    }
};

export const getThreadFromApi = (pageId) => {
    return dispatch => {
        FacebookService.threads(pageId)
            .then(
                result => { 
                    if(result && result.length){
                        dispatch(fetchThreads(pageId, result));
                    }
                }
            );
    };
}

export const threadChanged = (pageId, data) => {
    return {
        type: THREAD_CHANGED,
        payload: {
            pageId,
            data
        }
    }
};