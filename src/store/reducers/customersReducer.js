import { FETCH_CUSTOMER, GET_CUSTOMER_TAGS, UPDATE_CUSTOMER } from '../actions/customersActions'

const initialState = {}

const customersReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case FETCH_CUSTOMER:
            state[payload.id] = payload;
            return state;
        case UPDATE_CUSTOMER:
            state[id] = {
                ...state[payload.id],
                ...payload.data
            }
            return state;
        case GET_CUSTOMER_TAGS:
            const { id, tags } = payload;
            state[id] = {
                ...state[id],
                tags
            };
            return state;
            break;
        default:
            return state;
    }
};

export default customersReducer