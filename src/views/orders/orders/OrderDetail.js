import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CCard, CCardHeader, CCollapse, CDropdownDivider, CCardFooter, CButton, CBadge, CListGroup, CListGroupItem, CInput, CFormGroup, CTextarea, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdown } from '@coreui/react';
import commonUtils from '../../../utils/commonUtils';
import formatUtils from '../../../utils/formatUtils';
import CIcon from '@coreui/icons-react';
import { cilTruck, cilMoney, cilTrash } from '@coreui/icons';
import { OrderService } from '../../../services/order';
import MyAlert from '../../../components/Alert';
import Config from '../../../constants/Config';
import MoneyFormat from '../../../components/MoneyFormat';
import CurrencyInput from 'react-currency-input-field';
const OrderDetail = (props) => {
    const { order, page } = props;
    const [collapse, setCollapse] = useState(1);
    //Order detail
    const [orderDetails, setOrderDetails] = useState(order.products);
    const [subtotal, setSubTotal] = useState(order.subtotal);
    const [shipping, setShipping] = useState(order.shipping);
    const [shippingNote, setShippingNote] = useState(order.shipping_note);
    const [shippingShow, setShippingShow] = useState(false);
    const [discount, setDiscount] = useState(order.discount);
    const [discountShow, setDiscountShow] = useState(false);
    const [discountNote, setDiscountNote] = useState(order.discount_note);
    const [total, setTotal] = useState(order.total);
    const [note, setNote] = useState(order.note);
    const [savingOrder, setSavingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getThreadMessagesFromAPI(thread.id));
        // thread.unread_count = 0;
        // setPage(1);
        // dispatch(threadChanged(thread));
    }, [order.id]);

    const toggle = ()=>{

    }
    const removeOrderProduct = (index) => {
        var newOrderDetails = [...orderDetails];
        newOrderDetails.splice(index, 1);
        setOrderDetails(newOrderDetails);
        calculateTotal(newOrderDetails);
    }

    const calculateTotal = (details = [])=>{
       var total = details.reduce((currentValue, item) => currentValue + (item.quantity * item.price), 0);
       setTotal(total + discount + shipping);
       setSubTotal(total);
    }

    const changeProductQuantity = (index, value)=>{
        var newOrderDetails = [...orderDetails];
        newOrderDetails[index].quantity = parseInt(value);
        setOrderDetails(newOrderDetails);
        calculateTotal(newOrderDetails);
    }

    const createOrder = async ()=>{
        setSavingOrder(true);
        const response = await OrderService.createOrder({
            page_id: page.id,
            customer_id: customerId,
            subtotal: subtotal,
            discount: discount,
            shipping: shipping,
            total: total,
            discount_note: discountNote,
            shipping_note: shippingNote,
            note: note,
            products: orderDetails
        });
        if(response.success){
            MyAlert.fire({
                title: 'Tạo đơn hàng thành công'
            })
        }else{
            setErrorMessage(response.message);
        }
    }

    return (
        <div className="order-detail-container">
            <CCard>
                <CCardHeader>
                    <div>
                        <strong>#{order.order_code}</strong><br/>
                        <CBadge className="order-status" color={commonUtils.getOrderStatusClass(order.status)}>
                            <CIcon content={cilTruck} />
                            {commonUtils.getOrderStatusStr(order.status)}
                        </CBadge>
                        <CBadge className="order-payment-status" color={commonUtils.getOrderPaymentStatusClass(order.status)}>
                            <CIcon content={cilMoney} />
                            {commonUtils.getOrderPaymentStatusStr(order.status)}
                        </CBadge>
                    </div>
                    <div className="card-header-actions">
                        {/* <time>{formatUtils.dateFormat(order.createdAt)}</time> */}
                        <CDropdown className="m-1">
                            <CDropdownToggle split color="primary">
                                Primary
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem header>Header</CDropdownItem>
                                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownDivider />
                                <CDropdownItem>Another Action</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                </CCardHeader>
                <div className="product-list-container">
                    {order.products.length == 0 && <strong className="order-empty">Sản phẩm trong đơn hàng sẽ hiển thị ở đây...</strong>}
                    <CListGroup>
                        {
                            order.products.map((product, index) => {
                                return (<CListGroupItem className="justify-content-between" key={product.product_id}>
                                    <div className="product-image">
                                        <img src={product.image ? `${Config.apiUrl}/${product.image}` : '/images/default_product.jpg'}/>
                                    </div>
                                    <div className="product-detail">
                                        {product.name} <br/>
                                        <MoneyFormat value={product.price}/>
                                    </div>
                                    <div>x</div>
                                    <div className="product-quantity">
                                        <CInput type={'number'} value={product.quantity} onChange={(e) => changeProductQuantity(index, e.target.value)} min={1}/>
                                    </div>
                                    <CIcon onClick={() => removeOrderProduct(index)} className="float-right" content={cilTrash} />
                                </CListGroupItem>)
                            })
                        }
                    </CListGroup>
                </div>
                <CCollapse show={subtotal>0}>
                    <div className="order-total-container">
                        <div className="order-total-row">
                            <label>Tiền hàng</label>
                            <MoneyFormat value={subtotal}/>
                        </div>
                        <div className="order-total-row">
                            <div>
                                <label>Giảm giá</label>
                                {
                                discountNote && !discountShow ? (<span className="discount-note text-muted">(Lý do: {discountNote})</span>) : null
                                }
                            </div>
                            <CButton className="btn btn-link" onClick={() => setDiscountShow(!discountShow)}>{discountShow ? 'Đóng' : (discount <= 0 ? 'Thêm giảm giá' : (<MoneyFormat value={discount}/>))}</CButton>
                        </div>
                        <CCollapse show={discountShow}>
                            <div className="discount-container">
                                <CFormGroup>
                                    <CurrencyInput
                                        id="price"
                                        name="price"
                                        placeholder="Nhập tiền..."
                                        defaultValue={0}
                                        allowDecimals={false}
                                        decimalsLimit={0}
                                        prefix={Config.currencySymbol + ' '}
                                        className="form-control"
                                        onChange={(value) => setDiscount(parseInt(value) || 0)}
                                        value={discount}
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CTextarea placeholder="Lý do giảm giá" multiple={true} rows={2} value={discountNote} onChange={(e) => setDiscountNote(e.target.value)}></CTextarea>
                                </CFormGroup>
                            </div>
                        </CCollapse>
                        <div className="order-total-row">
                            <div>
                                <label>Phí vận chuyển</label>
                                {
                                shippingNote && !shippingShow ? (<span className="discount-note text-muted">({shippingNote})</span>) : null
                                }
                            </div>
                            <CButton className="btn btn-link" onClick={() => setShippingShow(!shippingShow)}>{shippingShow ? 'Đóng' : (shipping <= 0 ? 'Thêm phí vận chuyển' : (<MoneyFormat value={shipping}/>))}</CButton>
                        </div>
                        <CCollapse show={shippingShow}>
                            <div className="shipping-container">
                                <CFormGroup>
                                    <CurrencyInput
                                        id="price"
                                        name="price"
                                        placeholder="Nhập tiền..."
                                        defaultValue={0}
                                        allowDecimals={false}
                                        decimalsLimit={0}
                                        prefix={Config.currencySymbol + ' '}
                                        className="form-control"
                                        onChange={(value) => setShipping(parseInt(value) || 0)}
                                        value={shipping}
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CTextarea placeholder="Mã vận đơn" multiple={true} rows={2} value={shippingNote} onChange={(e) => setShippingNote(e.target.value)}></CTextarea>
                                </CFormGroup>
                            </div>
                        </CCollapse>
                        <div className="order-total-row">
                            <label>Tổng tiền</label>
                            <MoneyFormat  value={total}/>
                        </div>
                        <div className="order-total-row order-note-row">
                            <label>Ghi chú</label>
                            <CFormGroup>
                                <CTextarea placeholder="" multiple={true} rows={2} value={note} onChange={(e) => setNote(e.target.value)}></CTextarea>
                            </CFormGroup>
                        </div>
                    </div>
                </CCollapse>
            </CCard>
        </div>
    )
}

export default OrderDetail
