import { FacebookService } from "../../services/facebook";
import { CustomerService } from "../../services/customer";

//Action names
export const FETCH_CUSTOMER = 'FETCH_CUSTOMER'

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