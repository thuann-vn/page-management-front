import { OrderService } from "../../services/order";

//Action names
export const FETCH_CUSTOMER_ORDERS = 'FETCH_CUSTOMER_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'

export const fetchCustomerOrders = (customerId) => {
    return dispatch => {
        OrderService.getOrders()
            .then(
                result => { 
                    if(result){
                        dispatch({
                            type: FETCH_CUSTOMER_ORDERS,
                            payload: {customerId: customerId, data: result}
                        });
                    }
                }
            );
    };
}


export const addOrderSuccess = (customerId, data) => {
    return {
        type: ADD_ORDER,
        payload: {
            customerId: customerId,
            data
        }
    }
}