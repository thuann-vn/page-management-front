import { FETCH_CUSTOMER } from '../actions/customersActions'

const initialState = {}

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER:
            const {payload} = action;
            state[payload.id] = payload;
            return state;
        default:
            return state;
    }
};

export default customersReducer