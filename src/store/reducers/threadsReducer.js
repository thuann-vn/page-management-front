import { FETCH_THREADS, THREAD_CHANGED } from '../actions/threadsActions'

const initialState = []

const threadsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THREADS:
            return action.payload;
        case THREAD_CHANGED:
            const {payload} = action;

            state = state.map((thread)=>{
                if(thread.id == payload.id){
                    thread.snippet = payload.snippet;
                    thread.updated_time = payload.updated_time;
                    thread.unread_count = payload.unread_count;
                }
                return thread;
            })
            return state;
        default:
            return state;
    }
};

export default threadsReducer