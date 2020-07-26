import { FETCH_THREAD_MESSAGES } from '../actions/messagesActions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THREAD_MESSAGES:
            var threadId = action.payload.id;
            state[action.payload.id] = [...action.payload.messages]   
            return state;
        default:
            return state;
    }
};

export default messagesReducer