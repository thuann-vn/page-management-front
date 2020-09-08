import { FETCH_CUSTOMER, GET_CUSTOMER_TAGS, UPDATE_CUSTOMER, GET_CUSTOMER_ACTIVITIES } from '../actions/customersActions'

const initialState = {}

const customersReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case FETCH_CUSTOMER:
            if(state[payload.id]){
                state[payload.id] = {
                    ...state[payload.id],
                    ...payload
                }
            }else{
                state[payload.id] = payload
            }
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
        case GET_CUSTOMER_ACTIVITIES:
            const { activities } = payload;
            state[payload.id] = {
                ...state[payload.id],
                activities
            };
            return state;
        default:
            return state;
    }
};

export default customersReducer