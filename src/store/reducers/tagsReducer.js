import { FETCH_TAGS } from "../actions/tagsActions";

const initialState = []

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAGS:
            const {payload} = action;
            return payload;
        default:
            return state;
    }
};

export default tagsReducer