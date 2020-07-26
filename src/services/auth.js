import api from "./api"

export const AuthService  = {
    facebookLogin: (profile)=>{
        return api.call('/api/auth/facebook', {
            profile
        }, 'POST');
    },
    login: (email, password)=>{
        return api.call('/api/auth/login', {
            "email" : email,
            "password" : password
        }, 'POST');
    },
    register: (data)=>{
        return api.call('/api/v1/auth/register', data, 'POST');
    },
    logout: (token) => {
        return api.call('/api/auth/logout', {
            notification_token: token
        }, 'POST');
    },
}