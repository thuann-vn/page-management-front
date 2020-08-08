import { FacebookService } from "../../services/facebook";
import { CustomerService } from "../../services/customer";

//Action names
export const FETCH_CUSTOMER = 'FETCH_CUSTOMER'
export const GET_CUSTOMER_TAGS = 'GET_CUSTOMER_TAGS'
export const ADD_CUSTOMER_TAGS = 'ADD_CUSTOMER_TAGS'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'

export const fetchCustomer = (customer) => {
    return {
        type: FETCH_CUSTOMER,
        payload: customer
    }
};

export const getCustomerFromApi = (id) => {
    return dispatch => {
        CustomerService.getCustomer(id)
            .then(
                result => { 
                    if(result){
                        dispatch(fetchCustomer(result));
                    }
                }
            );
    };
}

export const getCustomerTags = (customerId)=>{
    return dispatch => {
        CustomerService.getTags(customerId)
            .then(
                result => { 
                    if(result){
                        dispatch({
                            type: GET_CUSTOMER_TAGS,
                            payload: {
                                id: customerId,
                                tags: result
                            }
                        });
                    }
                }
            );
    };
}

export const addCustomerTags = (customerId, tags) => {
    return dispatch => {
        CustomerService.addTags(customerId, tags)
            .then(
                result => { 
                    if(result){
                        dispatch(getCustomerTags(customerId));
                    }
                }
            );
    };
}

export const updateCustomer = (customerId, data) => {
    return dispatch => {
        CustomerService.updateCustomer(customerId, data)
            .then(
                result => { 
                    if(result){
                        dispatch({
                            type: UPDATE_CUSTOMER,
                            payload: {
                                id: customerId,
                                data: data
                            }
                        });
                    }
                }
            );
    };
}