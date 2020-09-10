import { FETCH_TAGS, ADD_TAG } from "../actions/tagsActions";

const initialState = []

const tagsReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case FETCH_TAGS:
            return payload;
        case ADD_TAG: 
            return [...state, payload];
        default:
            return state;
    }
};

export default tagsReducer