import { FETCH_THREADS } from '../actions/threadsActions'

const initialState = []

const threadsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THREADS:
            return action.payload;
        default:
            return state;
    }
};

export default threadsReducer