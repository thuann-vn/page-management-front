import React, { useState, useEffect, useRef } from 'react'
import MoneyFormat from '../MoneyFormat';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import { CLabel, CBadge } from '@coreui/react';
import commonUtils from '../../utils/commonUtils';
import CIcon from '@coreui/icons-react';
import { cilMoney, cilTruck } from '@coreui/icons';

const OrderRow = (props) => {
    const { data, active } = props;
    var className = 'order-row';
    if(active){
        className += ' active';
    }
    return (
        <div className={className}>
            <div className="order-info">
                <span className="order-code">#{data.order_code}</span>
                <span className="order-description">
                    {data.customer.name} <br/>
                    {data.products.map(item=>item.name).join(', ')}
                </span><br/>
                <CBadge className="order-status" color={commonUtils.getOrderStatusClass(data.status)}>
                    <CIcon content={cilTruck}/>
                   {commonUtils.getOrderStatusStr(data.status)}
                </CBadge>
                <CBadge className="order-payment-status" color={commonUtils.getOrderPaymentStatusClass(data.status)}>
                    <CIcon content={cilMoney}/>
                   {commonUtils.getOrderPaymentStatusStr(data.status)}
                </CBadge>
            </div>
            <div className="order-price">
                <ReactTimeAgo date={data.createdAt}/> <br/>
                <MoneyFormat value={data.total}/>
            </div>
        </div>
    )
}

export default OrderRow
