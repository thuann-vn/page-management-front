import { FETCH_THREADS, THREAD_CHANGED } from '../actions/threadsActions'

const initialState = {}

const threadsReducer = (state = initialState, action) => {
    const { pageId, data } = (action.payload || {});
    switch (action.type) {
        case FETCH_THREADS:
            state[pageId] = data;
            return {
                ...state
            };
        case THREAD_CHANGED:
            if(state[pageId]){
                state = state[pageId].map((thread)=>{
                    if(thread.id == data.id){
                        thread.snippet = data.snippet;
                        thread.updated_time = data.updated_time;
                        thread.unread_count = data.unread_count;
                    }
                    return thread;
                })
            }
            
            return state;
        default:
            return state;
    }
};

export default threadsReducer