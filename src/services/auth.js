// /**** Copyright Notice ****
//  * All contents including (but not limited to) all written materials, photos,
//  * documentation and code are protected by MarketSpace LLC, a LLC registered with
//  * state of California, United States of America. You may not copy, modify, reproduce, republish,
//  *retransmit or distribute any material without express written permission
// */

import api from "./api"

export const AuthService  = {
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