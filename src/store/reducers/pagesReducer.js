import { FETCH_PAGES } from "../actions/pagesActions";

const initialState = []

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAGES:
            const {payload} = action;
            return payload;
        default:
            return state;
    }
};

export default pagesReducer