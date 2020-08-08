import { FETCH_CUSTOMER, GET_CUSTOMER_TAGS } from '../actions/customersActions'

const initialState = {}

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER:
            const { payload } = action;
            state[payload.id] = payload;
            return state;
        case GET_CUSTOMER_TAGS:
            const { id, tags } = action.payload;
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