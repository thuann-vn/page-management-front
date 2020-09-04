import React, { useState, useEffect, useRef } from 'react'
import MoneyFormat from '../MoneyFormat';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

const OrderRow = (props) => {
    const { data } = props;
    return (
        <div className="order-row">
            <div className="order-info">
                <strong className="order-code">#{data.order_code}</strong><br/>
                <span className="order-description">
                    {data.products.map(item=>item.name).join(', ')}
                </span>
            </div>
            <div className="order-price">
                <ReactTimeAgo date={data.createdAt}/> <br/>
                <MoneyFormat value={data.total}/>
            </div>
        </div>
    )
}

export default OrderRow
