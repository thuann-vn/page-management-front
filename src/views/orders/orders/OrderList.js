import React, { useState, useEffect } from 'react'
import CustomScroll from 'react-custom-scroll';
import { CInput } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilX } from '@coreui/icons';
import { search } from "ss-search"
import OrderRow from '../../../components/orders/orderRow';

const OrderList = (props) => {
    const [orders, setOrders] = useState(props.orders || []);
    const [searchText, setSearchText] = useState('');
    
    React.useEffect(()=>{
        setOrders([...props.orders]);
        setSearchText('');
    }, [props.orders]);

    const clickEvent = (item)=>{
        props.onItemClick(item);
    }

    const searchThread = (q = '')=>{
        setSearchText(q);
        const results = search(props.orders, ['name'], q);
        setOrders(results);
    }

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <span className="search-icon">
                    <CIcon content={cilSearch} />
                </span>
                <CInput placeholder="Tìm kiếm..." value={searchText} onChange={(e)=>searchThread(e.target.value)}></CInput>
                {
                    searchText ? (
                        <span className="clear-icon">
                            <CIcon content={cilX}  onClick={()=>searchThread('')}/>
                        </span>
                    ) : null
                }
                
            </div>
            <CustomScroll heightRelativeToParent="100%">
                <div className="contacts">
                    {orders.map((item)=>{
                        return (
                            <div key={item.id} onClick={()=>clickEvent(item)}>
                                <OrderRow active={item.id == props.activeItem.id} data={item}/>
                            </div>
                        )
                    })}
                </div>
            </CustomScroll>
        </div>
        
    )
}

export default OrderList;