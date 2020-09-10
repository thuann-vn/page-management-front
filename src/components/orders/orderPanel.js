import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { getCustomerFromApi, updateCustomerTags, getCustomerTags, updateCustomer, getCustomerActivities } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilBarcode, cilEnvelopeClosed, cilClock, cilInfo, cilPhone, cilAddressBook, cilDelete, cilTrash } from '@coreui/icons';
import { CButton, CCollapse, CCardBody, CInput, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CPopover, CLink, CDropdown, CDropdownToggle, CDropdownMenu, CCard, CCardHeader, CListGroup, CListGroupItem, CBadge, CButtonGroup, CFormGroup, CTextarea } from '@coreui/react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { fetchTags } from '../../store/actions/tagsActions';
import { CirclePicker, TwitterPicker } from 'react-color';
import { TagColors, DefaultTagColor } from '../../constants/Colors';
import { TagService } from '../../services/tag';
import CustomScroll from 'react-custom-scroll';
import AddOrderModal from './addOrderModal';
import { fetchCustomerOrders } from '../../store/actions/ordersActions';
import MoneyFormat from '../MoneyFormat';
import OrderRow from './orderRow';
import { CustomerService } from '../../services/customer';
import commonUtils from '../../utils/commonUtils';
import CustomerTagModal from '../customers/customerTagModal';
const OrderPanel = (props) => {
    const { id } = props;
    const customer = useSelector(state => state.customers[id] || { tags: [] });
    const tags = useSelector(state => state.tags || []);
    const [tagInputCollapse, setTagInputCollapse] = useState(false);
    const [noteInputCollapse, setNoteInputCollapse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editingTags, setEditingTags] = useState(false);

    //New tag input
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState(DefaultTagColor);
    const [tagList, setTagList] = useState([]);

    //Notes
    const [notes, setNotes] = useState(customer.notes);

    //Saving notes
    const [savingNotes, setSavingNotes] = useState(false);

    const dispatch = useDispatch();
    const tagInputRef = useRef();

    useEffect(() => {
        if (id) {
            dispatch(getCustomerFromApi(id));
            dispatch(getCustomerTags(id));
            dispatch(getCustomerActivities(id));
        }
    }, [id]);

    const handleSearch = () => {

    }

    const tagFormToggle = () => {
        setTagInputCollapse(!tagInputCollapse);
        if (!tagInputCollapse) {
            dispatch(fetchTags(customer.tags.map(tag => tag._id)));
        }
    }

    const addTags = (addTags) => {
        const { tags = [] } = customer;
        tagInputRef.current.blur();
        // setTagInputCollapse(false);

        const newTags = [
            ...tags,
            ...addTags
        ]
        customer.tags = newTags;
        dispatch(updateCustomerTags(id, newTags));
    }

    const removeTag = (tag) => {
        if (tag.customOption) {
            return;
        }
        const index = customer.tags.findIndex((item) => item._id == tag._id);
        customer.tags.splice(index, 1);
        dispatch(updateCustomerTags(id, customer.tags));
    }

    const changeAddress = (value) => {
        if (customer.address != value) {
            dispatch(updateCustomer(id, { address: value }));
        }
    }

    const changePhoneNumber = (value) => {
        if (value != customer.phone) {
            dispatch(updateCustomer(id, { phone: value }));
        }
    }

    const openTagManage = async () => {
        setEditingTags(true);
        const result = await TagService.getTags();
        setTagList(result);
    }

    const saveNotes = async () =>{
        dispatch(updateCustomer(id, { notes }));
        setNoteInputCollapse(false);
    }

    return (
        <div className="customer-panel">
            <div className="customer-name">
                {customer.name}

                <CIcon content={cilInfo}></CIcon>
            </div>
            <div className="customer-avatar">
                <div class="pic" style={{ backgroundImage: `url("${customer.avatar ? customer.avatar : '/avatars/default.jpg'}")` }}></div>
            </div>
            <div className="customer-info">
                <div className="customer-row">
                    <CIcon content={cilClock}/>
                    Bắt đầu từ&nbsp;<ReactTimeAgo date={customer.last_update || new Date()} locale="vi"/>
                </div>
                <div className="customer-row">
                    <CIcon content={cilEnvelopeClosed}/>
                    <span>{customer.email}</span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilPhone}/>
                    <span>
                        <CInput placeholder="Nhập số điện thoại" value={customer.phone} onBlur={(event) => changePhoneNumber(event.target.value)} />
                    </span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilAddressBook}/>
                    <span>
                        <CInput placeholder="Nhập địa chỉ" value={customer.address} onBlur={(event) => changeAddress(event.target.value)} />
                    </span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilInfo}/>
                    <span>{customer.id}</span>
                </div>
            </div>
            <hr />
            <div className="customer-tags">
                <div className="customer-panel">
                    <label className="">Thẻ</label>
                    <CButton className="btn btn-link btn-block btn-pill active" onClick={() => openTagManage()}>Quản lý</CButton>
                </div>
                <div className="add-tab-container">
                    <CButton className="active btn btn-behance btn-pill btn-sm" onClick={() => tagFormToggle()}>+ Thêm thẻ</CButton>
                    <CCollapse show={tagInputCollapse}>
                        <div className="add-tag-form">
                            <AsyncTypeahead
                                id="tag-typeahead"
                                isLoading={isLoading}
                                labelKey="name"
                                minLength={0}
                                onSearch={handleSearch}
                                ref={tagInputRef}
                                placeholder="Nhập tên thẻ..."
                                newSelectionPrefix="+ "
                                allowNew
                                selected={selectedTags}
                                onChange={(selected) => addTags(selected)}
                                options={tags}
                                selectHintOnEnter={true}
                                autoFocus={true}
                                searchText={''}
                            />
                        </div>
                    </CCollapse>
                </div>
                {
                    customer.tags && (
                        <div className="tags-list">
                            {
                                customer.tags.map((tag, index) => {
                                    return (
                                        <div key={'tag_' + (tag._id ? tag._id : (tag.id ? tag.id : index))} className="btn btn-pill btn-sm btn-secondary" style={{ opacity: tag.customOption ? 0.5 : 1 }}>
                                            <span className="tag-color" style={{backgroundColor: tag.color || DefaultTagColor}}></span>
                                            {tag.name}
                                            <CButton className="btn-remove btn-link" onClick={() => { removeTag(tag) }}>x</CButton>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                
            </div>
            
            <CustomerTagModal
                show={editingTags}
                onClose={setEditingTags}
                addContentClass="tags-modal"
            />
            {
                customer.activities ?(
                    <div>
                        <hr/>
                        <div className="customer-activities">
                            <div className="customer-panel">
                                <label className="">Hoạt động</label>
                            </div>
                            <div className="activities-list">
                                {
                                    customer.activities.map((activity)=>{
                                        return (
                                            <div className="activity-row">
                                                <ReactTimeAgo date={activity.createdAt} locale="vi"/>
                                                <p key={'activity_'+ activity.id}>{commonUtils.getActivityStr(activity)}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) :null
            }
            
            <hr/>
            
            <div className="customer-notes">
                <div className="customer-panel">
                    <label className="">Ghi chú</label>
                    <CButton className="btn btn-link btn-block btn-pill active" onClick={() => setNoteInputCollapse(true)} disabled={noteInputCollapse}>{customer.notes ? 'Sửa ghi chú' : 'Thêm ghi chú'}</CButton>
                </div>
                <div className="customer-notes-container">
                    <div className="customer-notes" hidden={noteInputCollapse}>
                        {customer.notes_updated_time ? <ReactTimeAgo date={customer.notes_updated_time} locale="vi"/> : ''}
                        <span>{customer.notes ? customer.notes : ''}</span>
                    </div>
                    <CCollapse show={noteInputCollapse}>
                        <div className="add-note-form">
                            <CFormGroup>
                                <CTextarea placeholder="Viết ghi chú..." multiple={true} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}></CTextarea>
                            </CFormGroup>
                            <div className="add-note-buttons">
                                <CButton 
                                color="secondary" 
                                onClick={() => {setNoteInputCollapse(false); setNotes(customer.notes);}}
                                >Hủy</CButton>
                                <CButton color="primary" disabled={savingNotes} onClick={()=>saveNotes()}>{savingNotes ? 'Đang lưu...' : 'Lưu'} </CButton>
                            </div>

                            <div className="customer-notes-description">
                                Với ghi chú, bạn có thể ghi nhớ những chi tiết quan trọng về mọi người. Chỉ những người quản lý Trang của bạn mới nhìn thấy ghi chú.
                            </div>
                        </div>
                    </CCollapse>
                </div>
            </div>
        </div>
    )
}

export default OrderPanel
