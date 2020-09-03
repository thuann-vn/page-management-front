import { FETCH_ORDERS } from "../actions/ordersActions";

const initialState = {}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            const {payload} = action;
            state[payload.customerId] = payload.data;
            return state
        default:
            return state;
    }
};

export default ordersReducer