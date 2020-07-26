import { LOGIN, LOGOUT, UPDATE_PROFILE } from '../actions/settingsActions'

const initialState = {
   token: null,
   userInfo: null
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userInfo: action.payload.user,
                token: action.payload.token
            };
        case LOGOUT:
            return {
                ...state,
                userInfo: null,
                token: null
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                userInfo: {...state.userInfo, ...action.payload}
            };
        default:
            return state;
    }
};

export default settingsReducer