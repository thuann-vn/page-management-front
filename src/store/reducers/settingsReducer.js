import { LOGIN, LOGOUT, UPDATE_PROFILE, GET_SETUP_STATUS, SET_CURRENT_PAGE, TOGGLE_SIDEBAR } from '../actions/settingsActions'

const initialState = {
   token: null,
   userInfo: null,
   setupStatus: null,
   currentPage: null,
   sidebar_show: true
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
        case GET_SETUP_STATUS:
            return {
                ...state,
                userInfo: action.payload.user,
                setupStatus: action.payload
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebar_show: action.payload,
            };
        default:
            return state;
    }
};

export default settingsReducer