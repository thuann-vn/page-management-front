import { FETCH_CUSTOMER_ORDERS } from "../actions/customerOrdersActions";

const initialState = {}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_ORDERS:
            const {payload} = action;
            state[payload.customerId] = payload.data;
            return state
        default:
            return state;
    }
};

export default ordersReducer