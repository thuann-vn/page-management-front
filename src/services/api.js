import CONFIG from "../constants/Config";

export default {
    /**
     * API Call
     * url
     * data
     * method: GET, POST, PUT, UPLOAD, DELETE
     */
    call: async (url, data = {}, method = 'GET', contentType = 'application/json') => {
        let options = {
            method: method,
            headers: {
                'X-Requested-With' : 'XMLHttpRequest'
            }
        }

        //Send token if existed
        const token = localStorage.getItem('userToken');
        if(token){
            options.headers.Authorization = `Bearer ${token}`;
        }

        //Check if POST or PUT => send json
        if(contentType == 'application/json'){
            options.headers['Content-Type'] = contentType;
            if((method.toUpperCase() == 'POST' || method.toUpperCase() == 'PUT')){
                options.body = JSON.stringify(data);
            }
        }else{
            options.body = data;
        }

        //Call fetch
        return fetch(CONFIG.apiUrl + url, options).then((response) => {
            try{
                return response.json()
            }catch(ex){
                console.log('Parse response failed', response);
            }
        }).catch((error)=>{
            console.log('Call Api Error', CONFIG.apiUrl + url, error)
        });
    }
}