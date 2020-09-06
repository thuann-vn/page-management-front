import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomerFromApi, getCustomerTags } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilKeyboard, cilPlus, cilSatelite, cilImage, cilSearch } from '@coreui/icons';
import { CButton, CInput, CModal, CModalHeader, CModalTitle, CModalBody, CDropdown, CDropdownToggle, CDropdownMenu, CListGroup, CListGroupItem, CTabs, CNav, CTabContent, CTabPane, CFormGroup, CLabel, CCol, CTextarea, CModalFooter, CInvalidFeedback, CAlert, CCollapse } from '@coreui/react';
import { CirclePicker } from 'react-color';
import { TagColors, DefaultTagColor } from '../../constants/Colors';
import { TagService } from '../../services/tag';
import CustomScroll from 'react-custom-scroll';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CurrencyInput from 'react-currency-input-field';
import { ProductService } from '../../services/product';
import Config from '../../constants/Config';
import NumberFormat from 'react-number-format';
import MoneyFormat from '../MoneyFormat';
import { OrderService } from '../../services/order';
import MyAlert from '../Alert';

const AddOrderModal = (props) => {
    const { id, customerId } = props;
    const [opening, setOpening] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [searchingProducts, setSearchingProducts] = useState([]);
    
    //Order detail
    const [orderDetails, setOrderDetails] = useState([]);
    const [subtotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [shippingNote, setShippingNote] = useState('');
    const [shippingShow, setShippingShow] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [discountShow, setDiscountShow] = useState(false);
    const [discountNote, setDiscountNote] = useState('');
    const [total, setTotal] = useState(0);
    const [note, setNote] = useState('');
    const [savingOrder, setSavingOrder] = useState(false);

    //Product input
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const productInputRef = useRef();

    //New tag input
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductImage, setNewImage] = useState(null);
    const [newProductErrorShow, setNewProductErrorShow] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);
    const dispatch = useDispatch();

    //Track ID
    useEffect(() => {
        if (id) {
            dispatch(getCustomerFromApi(id));
            dispatch(getCustomerTags(id));
        }
    }, [id]);

    useEffect(() => {
        if(props.opening != opening){
            setOpening(props.opening);
            resetData();
        }
    }, [props.opening]);

    const searchProduct = (query) => {
        setIsLoadingProduct(true);
        ProductService.searchProducts(query).then((result)=>{
            if(result.success){
                setSearchingProducts(result.data);
            }
        }).finally(()=>{
            setIsLoadingProduct(false);
        })
    }
    
    const handleImageChange = (event) => {
        try{
            setNewImage(event.target.files[0]);
        }catch(ex){

        }
    }

    const validateProduct = ()=>{
        if(!newProductName || !newProductPrice){
            setNewProductErrorShow(true);
            return false;
        }
        
        setNewProductErrorShow(false);
        return true;
    }

    const addProduct = () => {
        if(!validateProduct()){
            return;
        }
        setAddingProduct(true);
        ProductService.createProduct({
            name: newProductName,
            price: newProductPrice,
            description: newProductDescription,
            image: newProductImage
        }).then(response => {
            if(response.success){
                setNewProductName('');
                setNewProductPrice('');
                setNewProductDescription('');
                setNewImage(null);
    
                setErrorMessage(null);
                setSuccessMessage('Tạo sản phẩm thành công!');
                
                //Add to product
                addOrderProduct(response.data);

                //Switch back to order tab
                setActiveTab(0);
            }else{
                setSuccessMessage('');
                setErrorMessage('Tạo sản phẩm không thành công, vui lòng thử lại!');
            }
        }).catch((e)=>{
            setSuccessMessage('');
            setErrorMessage('Tạo sản phẩm không thành công, vui lòng thử lại!');
        }).finally(()=>{
            setAddingProduct(false);
        })
    }

    const onSelectProduct = (selected)=>{
        if(selected && selected.length && selected[0].customOption){
            setActiveTab(1);
            setNewProductName(selected[0].name);
        }else{
            setSelectedProduct(selected ? selected : [])
        }
    }

    const addOrderProduct = (product = null) =>{
        if(!product && !selectedProduct.length){
            return;
        }
        var newOrderDetails = [...orderDetails];
        if(!product){
            product = selectedProduct[0];
        }
        console.log(product);
        var existedIndex = newOrderDetails.findIndex(item => item.product_id == product.id);
        if(existedIndex >=0){
            newOrderDetails[existedIndex].quantity+=1;
        }else{
            newOrderDetails = [
                ...newOrderDetails,
                {
                    ...product,
                    id: null,
                    product_id: product.id,
                    quantity: 1
                }
            ]
        }

        setOrderDetails(newOrderDetails);
        setSelectedProduct([]);
        calculateTotal(newOrderDetails);
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
            dispatch()
            resetData();
            close();
            MyAlert.fire({
                title: 'Tạo đơn hàng thành công'
            })
        }else{
            setErrorMessage(response.message);
        }
    }

    const resetData = ()=>{
        setSavingOrder(false);
        setOrderDetails([]);
        setTotal(0);
        setSubTotal(0);
        setDiscount(0);
        setDiscountShow(false);
        setShippingShow(false);
        setDiscountNote('');
        setShippingNote('');
        setSuccessMessage('');
        setErrorMessage('');
    }

    const close = ()=>{
        setOpening(false); 
        props.onStateChange && props.onStateChange(false)
    }

    return (
        <CModal
            show={opening}
            onClose={close}
            addContentClass="order-modal"
            closeOnBackdrop={false}
            {...props}
        >
            <CModalHeader closeButton>
                <CModalTitle>{activeTab == 0 ? 'Tạo đơn hàng' : 'Tạo sản phẩm'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CTabs activeTab={activeTab}>
                    <CTabContent>
                        <CTabPane>
                            <div className="order-detail-container">
                                <CAlert
                                    color="warning"
                                    show={successMessage != ''}
                                    closeButton
                                    onShowChange={(value)=> !true && setSuccessMessage('')}
                                >{successMessage}</CAlert>
                                <div className="add-product-container">
                                    <div className="add-product-input">
                                        <AsyncTypeahead
                                            id="product-typeahead"
                                            isLoading={isLoadingProduct}
                                            labelKey="name"
                                            minLength={0}
                                            multiple={false}
                                            onSearch={searchProduct}
                                            ref={productInputRef}
                                            placeholder="Chọn sản phẩm..."
                                            newSelectionPrefix="+ "
                                            allowNew
                                            selected={selectedProduct}
                                            onChange={(selected) => onSelectProduct(selected)}
                                            options={searchingProducts}
                                            selectHintOnEnter={true}
                                            autoFocus={true}
                                            searchText={''}
                                            renderMenuItemChildren  = {(item)=>{
                                                return (
                                                    <div className="product-search-item" key={item.id}> 
                                                        <div className="product-image">
                                                            <img src={item.image ? `${Config.apiUrl}/${item.image}` : '/images/default_product.jpg'}/>
                                                        </div>
                                                        <div>
                                                            {item.name}<br/>
                                                            <MoneyFormat value={item.price}/>
                                                        </div>
                                                    </div>
                                                )
                                            }}
                                        />
                                        {!isLoadingProduct ? <CIcon content={cilSearch} /> : null}
                                        <CButton className="btn-primary btn-add" onClick={()=>addOrderProduct()} disabled={!selectedProduct.length}>Thêm</CButton>
                                    </div>
                                </div>
                                <CustomScroll heightRelativeToParent="auto">
                                    <div className="product-list-container">
                                        {orderDetails.length == 0 && <strong className="order-empty">Sản phẩm trong đơn hàng sẽ hiển thị ở đây...</strong>}
                                        <CListGroup>
                                            {
                                                orderDetails.map((product, index) => {
                                                    return (<CListGroupItem className="justify-content-between" key={product.product_id}>
                                                        <div className="product-image">
                                                            <img src={product.image ? `${Config.apiUrl}/${product.image}` : '/images/default_product.jpg'}/>
                                                        </div>
                                                        <div className="product-detail">
                                                            {product.name} <br/>
                                                            <MoneyFormat  value={product.price}/>
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
                                </CustomScroll>
                                <CCollapse show={subtotal>0}>
                                    <div className="order-total-container">
                                        <div className="order-total-row">
                                            <label>Tiền hàng</label>
                                            <MoneyFormat  value={subtotal}/>
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
                                                        className={"form-control" + (newProductErrorShow && !newProductPrice > 0 ? ' is-invalid' : '') }
                                                        prefix={Config.currencySymbol + ' '}
                                                        onChange={(value, name) => setDiscount(parseInt(value) || 0)}
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
                                                        className={"form-control" + (newProductErrorShow && !newProductPrice > 0 ? ' is-invalid' : '') }
                                                        prefix={Config.currencySymbol + ' '}
                                                        onChange={(value, name) => setShipping(parseInt(value) || 0)}
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
                            </div>
                        </CTabPane>
                        <CTabPane>
                            <div className="add-product-container">
                                {successMessage && (<CAlert color="primary">{successMessage}</CAlert>)}
                                {errorMessage && (<CAlert color="danger">{errorMessage}</CAlert>)}
                                <div className="image-uploader">
                                    <span>
                                        <CIcon content={cilImage}/>
                                        Thêm ảnh
                                    </span>
                                    <input type="file" onChange={handleImageChange}/>
                                    {newProductImage && <img src={window.URL.createObjectURL(newProductImage)}/>}    
                                </div>
                                <CFormGroup>
                                    <CLabel htmlFor="name">Tên sản phẩm</CLabel>
                                    <CInput id="name" placeholder="Nhập tên sản phẩm..." size="lg" value={newProductName}  onChange={(e) => setNewProductName(e.target.value)} invalid={newProductErrorShow && !newProductName}/>
                                    {newProductErrorShow && !newProductName && (<CInvalidFeedback>Vui lòng nhập tên sản phẩm</CInvalidFeedback>)}
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="price">Giá bán</CLabel>
                                    <CurrencyInput
                                        id="price"
                                        name="price"
                                        placeholder="Nhập tiền..."
                                        defaultValue={0}
                                        allowDecimals={false}
                                        decimalsLimit={0}
                                        className={"form-control" + (newProductErrorShow && !newProductPrice > 0 ? ' is-invalid' : '') }
                                        prefix={Config.currencySymbol + ' '}
                                        onChange={(value, name) => setNewProductPrice(value)}
                                        value={newProductPrice}
                                    />
                                    {newProductErrorShow && !newProductPrice > 0 && (<CInvalidFeedback>Vui lòng nhập giá sản phẩm</CInvalidFeedback>)}
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="description">Mô tả</CLabel>
                                    <CTextarea id="description" placeholder="Mô tả" multiple={true} rows={2} value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)}></CTextarea>
                                </CFormGroup>
                            </div>
                        </CTabPane>
                    </CTabContent>
                </CTabs>
            </CModalBody>
            
            {
                activeTab == 0 && (
                    <CModalFooter>
                        <CButton 
                        color="secondary" 
                        onClick={close}
                        >Hủy</CButton>
                        <CButton color="primary" disabled={savingOrder || total <= 0} onClick={()=>createOrder()}>{savingOrder ? 'Đang tạo...' : 'Tạo đơn hàng'} </CButton>
                    </CModalFooter>
                )
            }
            {
                activeTab == 1 && (
                    <CModalFooter>
                        <CButton 
                        color="secondary" 
                        onClick={() => setActiveTab(0)}
                        >Hủy</CButton>
                        <CButton color="primary" disabled={addingProduct} onClick={()=>addProduct()}>{addingProduct ? 'Đang thêm...' : 'Thêm mới'} </CButton>
                    </CModalFooter>
                )
            }
        </CModal>
    )
}

export default AddOrderModal

export function useOrderModal(WrappedComponent) {
    const openModal = ()=>{

    }
  
    return (
        <>
            <AddOrderModal></AddOrderModal>
            <WrappedComponent/>
        </>
    )
}