import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CCard, CCardHeader, CCollapse, CCardBody, CCardFooter, CButton, CBadge } from '@coreui/react';
import commonUtils from '../../../utils/commonUtils';
import formatUtils from '../../../utils/formatUtils';
import CIcon from '@coreui/icons-react';
import { cilTruck, cilMoney } from '@coreui/icons';
const OrderDetail = (props) => {
    const { order } = props;
    const [collapse, setCollapse] = useState(1);
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getThreadMessagesFromAPI(thread.id));
        // thread.unread_count = 0;
        // setPage(1);
        // dispatch(threadChanged(thread));
    }, [order.id]);

    const toggle = ()=>{

    }

    return (
        <div className="order-detail-container">
            <CCard>
                <CCardHeader>
                    <div>
                        <strong>#{order.order_code}</strong><br/>
                        <time>{formatUtils.dateFormat(order.createdAt)}</time>
                    </div>
                    <div className="card-header-actions">
                        <CBadge className="order-status" color={commonUtils.getOrderStatusClass(order.status)}>
                            <CIcon content={cilTruck} />
                            {commonUtils.getOrderStatusStr(order.status)}
                        </CBadge>
                        <CBadge className="order-payment-status" color={commonUtils.getOrderPaymentStatusClass(order.status)}>
                            <CIcon content={cilMoney} />
                            {commonUtils.getOrderPaymentStatusStr(order.status)}
                        </CBadge>
                    </div>
                </CCardHeader>
                <CCollapse show={collapse}>
                    <CCardBody>
                        <p>
                            Anim pariatur cliche reprehenderit,
                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident.
                            </p>
                        <p>
                            Donec molestie odio id nisi malesuada, mattis tincidunt velit egestas. Sed non pulvinar risus. Aenean
                            elementum eleifend nunc, pellentesque dapibus arcu hendrerit fringilla. Aliquam in nibh massa. Cras
                            ultricies lorem non enim volutpat, a eleifend urna placerat. Fusce id luctus urna. In sed leo tellus.
                            Mauris tristique leo a nisl feugiat, eget vehicula leo venenatis. Quisque magna metus, luctus quis
                            sollicitudin vel, vehicula nec ipsum. Donec rutrum commodo lacus ut condimentum. Integer vel turpis
                            purus. Etiam vehicula, nulla non fringilla blandit, massa purus faucibus tellus, a luctus enim orci non
                            augue. Aenean ullamcorper nisl urna, non feugiat tortor volutpat in. Vivamus lobortis massa dolor, eget
                            faucibus ipsum varius eget. Pellentesque imperdiet, turpis sed sagittis lobortis, leo elit laoreet arcu,
                            vehicula sagittis elit leo id nisi.
                            </p>
                    </CCardBody>
                </CCollapse>
                <CCardFooter>
                    <CButton
                        color="primary"
                        onClick={toggle}
                        className={'mb-1'}
                    >Toggling button</CButton>
                </CCardFooter>
            </CCard>

        </div>
    )
}

export default OrderDetail
