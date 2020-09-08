import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { getCustomerFromApi, updateCustomerTags, getCustomerTags, updateCustomer } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilBarcode, cilEnvelopeClosed, cilClock, cilInfo, cilPhone, cilAddressBook, cilDelete, cilTrash } from '@coreui/icons';
import { CButton, CCollapse, CCardBody, CInput, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CPopover, CLink, CDropdown, CDropdownToggle, CDropdownMenu, CCard, CCardHeader, CListGroup, CListGroupItem, CBadge, CButtonGroup, CFormGroup, CTextarea } from '@coreui/react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { fetchTags } from '../../store/actions/tagsActions';
import { CirclePicker, TwitterPicker } from 'react-color';
import { TagColors, DefaultTagColor } from '../../constants/Colors';
import { TagService } from '../../services/tag';
import CustomScroll from 'react-custom-scroll';
import AddOrderModal from '../orders/addOrderModal';
import { fetchCustomerOrders } from '../../store/actions/ordersActions';
import MoneyFormat from '../MoneyFormat';
import OrderRow from '../orders/orderRow';
import { CustomerService } from '../../services/customer';
import commonUtils from '../../utils/commonUtils';
const CustomerPanel = (props) => {
    const { id } = props;
    const customer = useSelector(state => state.customers[id] || { tags: [] });
    const tags = useSelector(state => state.tags || []);
    const orders = useSelector(state => state.orders[id] || []);
    const [tagInputCollapse, setTagInputCollapse] = useState(false);
    const [noteInputCollapse, setNoteInputCollapse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editingTags, setEditingTags] = useState(false);
    const [activities, setActivities] = useState([]);

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

    const loadActivities = async ()=>{
        const result = await CustomerService.getActivities(id);
        if(result.success){
            setActivities(result.data);
        }
    }
    useEffect(() => {
        if (id) {
            dispatch(getCustomerFromApi(id));
            dispatch(getCustomerTags(id));
            loadActivities();
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

    const setTagColor = async (index, color) => {
        var tags = tagList;
        tags[index].color = color;
        setTagList([...tags]);

        TagService.updateTag(tags[index]).then((result) => {
            if (result && !result.success) {
                alert('Cập nhật thẻ không thành công');
                return;
            }

            const customerTagIndex = customer.tags.findIndex((item) => item._id == tags[index]._id);
            customer.tags[customerTagIndex].color = color;
        });
    }

    const deleteTag = async (tag, index) => {
        var tags = tagList;
        tags.splice(index, 1);
        setTagList([...tags]);

        TagService.deleteTag(tag._id).then((result) => {
            if (result && !result.success) {
                alert('Xóa thẻ không thành công!');
                return;
            }else{
                const customerTagIndex = customer.tags.findIndex((item) => item._id == tag._id);
                customer.tags.splice(customerTagIndex, 1);
            }    
        });
    }

    const addNewTag = async ()=>{
        if(!newTagName){
            return;
        }

        TagService.createTag({
            name: newTagName,
            color: newTagColor
        }).then(result=>{
            if(result){
                setTagList([...tags, result]);
                setNewTagName('');
                setNewTagColor(DefaultTagColor);
            }
        })
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
            </div>
            <CModal
                show={editingTags}
                onClose={setEditingTags}
                addContentClass="tags-modal"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Quản lý thẻ</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="add-tag-container">
                        <CInput placeholder="Nhập thẻ mới" value={newTagName} onChange={(e) => setNewTagName(e.target.value)}/>
                        <div className="tag-color-input">
                            <CDropdown className="m-1">
                                <CDropdownToggle>
                                    <span className="selected-color" style={{ backgroundColor: newTagColor }}></span>
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CirclePicker circleSpacing={5} colors={TagColors} color={newTagColor} width="198px" onChange={(color) => setNewTagColor(color.hex)} />
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <CButton className="btn-primary btn-add" onClick={addNewTag}>Thêm</CButton>
                    </div>
                    <CustomScroll heightRelativeToParent="auto">
                        <div className="tags-list-container">
                            <CListGroup>
                                {
                                    tagList.map((tag, index) => {
                                        return (<CListGroupItem className="justify-content-between" key={tag.id}>
                                            <div className="tag-color-input">
                                                <CDropdown className="m-1">
                                                    <CDropdownToggle>
                                                        <span className="selected-color" style={{ backgroundColor: tag.color || DefaultTagColor }}></span>
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        <CirclePicker circleSpacing={5} colors={TagColors} color={tag.color || DefaultTagColor} width="198px" onChange={(color) => setTagColor(index, color.hex)} />
                                                    </CDropdownMenu>
                                                </CDropdown>
                                            </div>
                                            {tag.name}
                                            <CIcon onClick={() => deleteTag(tag, index)} className="float-right" content={cilTrash} />
                                        </CListGroupItem>)
                                    })
                                }
                            </CListGroup>
                        </div>
                    </CustomScroll>
                </CModalBody>
            </CModal>
            <hr/>
            <div className="customer-activities">
                <div className="customer-panel">
                    <label className="">Hoạt động</label>
                </div>
                <div className="activities-list">
                    {
                        activities.map((activity)=>{
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

export default CustomerPanel
