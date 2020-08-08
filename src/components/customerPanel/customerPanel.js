import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { getCustomerFromApi, addCustomerTags, getCustomerTags } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilBarcode, cilEnvelopeClosed, cilClock, cilInfo } from '@coreui/icons';
import { CButton, CCollapse, CCardBody } from '@coreui/react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { fetchTags } from '../../store/actions/tagsActions';

const CustomerPanel = (props) => {
    const { id } = props;
    const customer = useSelector(state => state.customers[id] || { tags: [] });
    const tags = useSelector(state => state.tags || []);
    const [tagInputCollapse, setTagInputCollapse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
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
        dispatch(addCustomerTags(id, newTags));
    }

    const removeTag = (tag) => {
        if (tag.customOption) {
            return;
        }
        const index = customer.tags.findIndex((item) => item._id == tag._id);
        customer.tags.splice(index, 1);
        dispatch(addCustomerTags(id, customer.tags));
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
                    <CIcon content={cilClock} size="md" />
                    Join&nbsp;<ReactTimeAgo date={customer.last_update} />
                </div>
                <div className="customer-row">
                    <CIcon content={cilEnvelopeClosed} size="md" />
                    <span>{customer.email}</span>
                </div>
                <div className="customer-row">
                    <CIcon content={cilInfo} size="md" />
                    <span>{customer.id}</span>
                </div>
            </div>
            <hr />
            <div className="customer-tags">
                <div className="customer-panel">
                    <label className="">Tags</label>
                    <CButton className="btn btn-link btn-block btn-pill active" onClick={() => tagFormToggle()}>Manage</CButton>
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
                                <div key={'tag_' + (tag._id ? tag._id : (tag.id ? tag.id: index))} className="btn btn-pill btn-sm btn-secondary" style={{ opacity: tag.customOption ? 0.5 : 1 }}>
                                    {tag.name}
                                    <CButton className="btn-remove btn-link" onClick={() => { removeTag(tag) }}>x</CButton>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomerPanel
