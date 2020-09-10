import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerFromApi, getCustomerTags, getCustomerActivities } from '../../store/actions/customersActions';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { CButton, CInput, CModal, CModalHeader, CModalTitle, CModalBody, CDropdown, CDropdownToggle, CDropdownMenu, CListGroup, CListGroupItem } from '@coreui/react';
import { fetchTags, addTag } from '../../store/actions/tagsActions';
import { CirclePicker } from 'react-color';
import { TagColors, DefaultTagColor } from '../../constants/Colors';
import { TagService } from '../../services/tag';
import CustomScroll from 'react-custom-scroll';
const CustomerTagModal = (props) => {
    //New tag input
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState(DefaultTagColor);
    const tags = useSelector(state => state.tags || []);
    const [tagList, setTagList] = useState(tags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTags());
    }, []);

    useEffect(() => {
        setTagList(tags);
    }, [tags]);

    const deleteTag = async (tag, index) => {
        var tags = tagList;
        tags.splice(index, 1);
        setTagList([...tags]);

        TagService.deleteTag(tag._id).then((result) => {
            if (result && !result.success) {
                alert('Xóa thẻ không thành công!');
                return;
            }else{
                // const customerTagIndex = customer.tags.findIndex((item) => item._id == tag._id);
                // customer.tags.splice(customerTagIndex, 1);
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
                dispatch(addTag(result));
                setNewTagName('');
                setNewTagColor(DefaultTagColor);
            }
        })
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
        });
    }

    return (
        <CModal
            addContentClass="tags-modal"
            {...props}
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
                    <CButton className="btn-primary btn-add" onClick={() => addNewTag()}>Thêm</CButton>
                </div>
                <CustomScroll heightRelativeToParent="100%">
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
                                                <CDropdownMenu onChange={(event)=> console.log(event)}>
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
    )
}

export default CustomerTagModal
