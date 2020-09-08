import React, { useState, useEffect, useRef } from 'react'
import MoneyFormat from '../MoneyFormat';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import { CLabel, CBadge } from '@coreui/react';
import commonUtils from '../../utils/commonUtils';

const OrderRow = (props) => {
    const { data } = props;
    return (
        <div className="order-row">
            <div className="order-info">
                <span className="order-code">#{data.order_code}</span>
                <span className="order-description">
                    {data.customer.name} <br/>
                    {data.products.map(item=>item.name).join(', ')}
                </span><br/>
                <CBadge color={commonUtils.getOrderStatusClass(data.status)}>{commonUtils.getOrderStatusStr(data.status)}</CBadge>
            </div>
            <div className="order-price">
                <ReactTimeAgo date={data.createdAt}/> <br/>
                <MoneyFormat value={data.total}/>
            </div>
        </div>
    )
}

export default OrderRow
