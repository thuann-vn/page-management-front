import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { getCustomerFromApi } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilBarcode, cilEnvelopeClosed, cilClock, cilInfo } from '@coreui/icons';
import { CButton } from '@coreui/react';
 
const CustomerPanel = (props) => {
    const { id } = props;
    const customer = useSelector(state => state.customers[id] || {});
    const [newMessages, setNewMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(id){
            dispatch(getCustomerFromApi(id));
        }
    }, [id]);

    return (
        <div className="customer-panel">
            <div className="customer-name">
                {customer.name}
            </div>
            <div className="customer-avatar">
                <div class="pic" style={{backgroundImage: `url("${customer.avatar ? customer.avatar : '/avatars/default.jpg'}")`}}></div>
            </div>
            <div className="customer-info">
                <div className="customer-row">
                    <CIcon content={cilClock} size="md"/>
                    Join&nbsp;<ReactTimeAgo date={customer.last_update}/>
                </div>
                <div className="customer-row">
                    <CIcon content={cilEnvelopeClosed} size="md"/>
                    <span>{customer.email}</span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilInfo} size="md"/>
                    <span>{customer.id}</span>
                </div>
            </div>
            <hr/>
            <div className="customer-tags">
                <div className="customer-panel">
                    <label className="">Tags</label>
                    <CButton className="btn btn-link btn-block btn-pill active">+ Add Tag</CButton>
                </div>
            </div>
        </div>
    )
}

export default CustomerPanel
