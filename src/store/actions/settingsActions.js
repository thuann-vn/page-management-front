import { AccountService } from "../../services/account"

//Action names
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const GET_PROFILE_UPDATE_PERCENT = 'GET_PROFILE_UPDATE_PERCENT'
export const GET_SETUP_STATUS = 'GET_SETUP_STATUS'

export const login = (user, token) => {
    return {
        type: LOGIN,
        payload: { user, token }
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const updateProfile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        payload: profile
    }
};


export const getAccountSetupStatus = () => {
    return dispatch => {
        AccountService.getSetupStatus()
            .then(response => {
                if(response.success){
                    dispatch({
                        type: GET_SETUP_STATUS,
                        payload: response.data
                    })
                }
            });
    };
}