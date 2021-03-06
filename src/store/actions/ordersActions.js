import { OrderService } from "../../services/order";

//Action names
export const FETCH_ORDERS = 'FETCH_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'

export const fetchOrders = (pageId) => {
    return dispatch => {
        OrderService.getOrders(pageId)
            .then(
                result => { 
                    if(result){
                        dispatch({
                            type: FETCH_ORDERS,
                            payload: {pageId, data: result}
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