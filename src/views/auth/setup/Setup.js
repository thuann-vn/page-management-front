import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CListGroup,
  CListGroupItem,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FacebookService } from '../../../services/facebook';

const Setup = () => {
  const [pages, setPages] = useState([]);
  const _loadPages = async ()=>{
    const fbPages = await FacebookService.pages();
    setPages(fbPages);
    console.log(fbPages);
  }

  useEffect(()=>{
    _loadPages()
  }, []);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Page Setup</h1>
                  <p className="text-muted">Select pages to setup:</p>
                  <CListGroup>
                    {
                      pages.map((page)=>{
                        return (
                          <CListGroupItem className="justify-content-between" key={page.id}>
                            <div>
                              {page.name}<br/>
                              <span className="text-mute">{page.category}</span>
                            </div>
                            <CButton className="float-right" variant="outline" color="primary">Setup</CButton>
                          </CListGroupItem>
                        )
                      })
                    }
                  </CListGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Setup
