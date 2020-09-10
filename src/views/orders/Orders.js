import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OrderList from './orders/OrderList';

import Pusher from 'pusher-js';
import Config from '../../constants/Config';
import AddOrderModal from '../../components/orders/addOrderModal';
import OrderPanel from '../../components/orders/orderPanel';
import { fetchOrders } from '../../store/actions/ordersActions';
import OrderDetail from './orders/OrderDetail';

const Orders = () => {
    const pages = useSelector(state => state.pages || []);
    var defaultPage = pages.length ? pages[0] : null;
    const currentPage = useSelector(state => state.settings.currentPage || defaultPage)
    const allOrders = useSelector(state => state.orders || {})
    
    const [orders, setOrders] = useState(allOrders[currentPage.id] || []);
    const dispatch = useDispatch();
    const [activeOrder, setActiveOrder] = useState(orders.length? orders[0] : {});
    
    React.useEffect(()=>{
        if(allOrders[currentPage.id]){
            var newOrders = [...allOrders[currentPage.id]];
            setOrders(newOrders);
            setActiveOrder(newOrders.length ? newOrders[0] : {});
        }else{
            setOrders([]);
            setActiveOrder({});
        }

        dispatch(fetchOrders(currentPage.id));
    }, [currentPage]);

    return (
        <div class="chat-container">
            <OrderList orders={orders} activeItem={activeOrder} onItemClick={(item)=>{ setActiveOrder(item)}}/>
            <OrderDetail order={activeOrder} page={currentPage}/>
            <OrderPanel id={activeOrder.customer_id}/>
            <AddOrderModal customerId={activeOrder.id}></AddOrderModal>
        </div>
    )
}

export default Orders
