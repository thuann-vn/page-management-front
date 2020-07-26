import { FacebookService } from "../../services/facebook";

//Action names
export const FETCH_THREADS = 'FETCH_THREADS'

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
                    dispatch(fetchThreads(result));
                }
            );
    };
}