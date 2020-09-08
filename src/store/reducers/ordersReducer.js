import { FETCH_ORDERS } from "../actions/ordersActions";

const initialState = {}

const ordersReducer = (state = initialState, action) => {
    const { pageId, data } = (action.payload || {});
    switch (action.type) {
        case FETCH_ORDERS:
            state[pageId] = data;
            return {
                ...state
            };
        default:
            return state;
    }
};

export default ordersReducer