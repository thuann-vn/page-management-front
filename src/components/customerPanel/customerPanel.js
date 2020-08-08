import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { getCustomerFromApi, updateCustomerTags, getCustomerTags, updateCustomer } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilBarcode, cilEnvelopeClosed, cilClock, cilInfo, cilPhone, cilAddressBook, cilDelete, cilTrash } from '@coreui/icons';
import { CButton, CCollapse, CCardBody, CInput, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CPopover, CLink, CDropdown, CDropdownToggle, CDropdownMenu, CCard, CCardHeader, CListGroup, CListGroupItem, CBadge } from '@coreui/react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { fetchTags } from '../../store/actions/tagsActions';
import { CirclePicker, TwitterPicker } from 'react-color';
import { TagColors, DefaultTagColor } from '../../constants/Colors';
import { TagService } from '../../services/tag';
import CustomScroll from 'react-custom-scroll';
const CustomerPanel = (props) => {
    const { id } = props;
    const customer = useSelector(state => state.customers[id] || { tags: [] });
    const tags = useSelector(state => state.tags || []);
    const [tagInputCollapse, setTagInputCollapse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [editingTags, setEditingTags] = useState(false);


    //New tag input
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState(DefaultTagColor);
    const [tagList, setTagList] = useState([]);


    const dispatch = useDispatch();
    const tagInputRef = useRef();

    useEffect(() => {
        if (id) {
            dispatch(getCustomerFromApi(id));
            dispatch(getCustomerTags(id));
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
                alert('Can not update tag');
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
                alert('Delete tag failed');
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

    return (
        <div className="customer-panel">
            <div className="customer-name">
                {customer.name}
            </div>
            <div className="customer-avatar">
                <div class="pic" style={{ backgroundImage: `url("${customer.avatar ? customer.avatar : '/avatars/default.jpg'}")` }}></div>
            </div>
            <div className="customer-info">
                <div className="customer-row">
                    <CIcon content={cilClock}/>
                    Join&nbsp;<ReactTimeAgo date={customer.last_update} />
                </div>
                <div className="customer-row">
                    <CIcon content={cilEnvelopeClosed}/>
                    <span>{customer.email}</span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilPhone}/>
                    <span>
                        <CInput placeholder="Enter phone number" value={customer.phone} onBlur={(event) => changePhoneNumber(event.target.value)} />
                    </span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilAddressBook}/>
                    <span>
                        <CInput placeholder="Enter address" value={customer.address} onBlur={(event) => changeAddress(event.target.value)} />
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
                    <label className="">Tags</label>
                    <CButton className="btn btn-link btn-block btn-pill active" onClick={() => openTagManage()}>Manage</CButton>
                </div>
                <div className="add-tab-container">
                    <CButton className="active btn btn-behance btn-pill btn-sm" onClick={() => tagFormToggle()}>+ Add Tag</CButton>
                    <CCollapse show={tagInputCollapse}>
                        <div className="add-tag-form">
                            <AsyncTypeahead
                                id="tag-typeahead"
                                isLoading={isLoading}
                                labelKey="name"
                                minLength={0}
                                onSearch={handleSearch}
                                ref={tagInputRef}
                                placeholder="Add new tags..."
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
                    <CModalTitle>Customer Tags</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="add-tag-container">
                        <CInput placeholder="Add new tag" value={newTagName} onChange={(e) => setNewTagName(e.target.value)}/>
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
                        <CButton className="btn-primary btn-add" onClick={addNewTag}>Add</CButton>
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

        </div>
    )
}

export default CustomerPanel
