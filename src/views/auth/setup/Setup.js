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
import ProgressButton, {STATE} from 'react-progress-button'
import { FacebookService } from '../../../services/facebook';
import { AccountService } from '../../../services/account';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountSetupStatus } from '../../../store/actions/settingsActions';

const Setup = ({history}) => {
  const [pages, setPages] = useState([]);
  const [continueEnabled, setContinueEnabled] = useState(false);
  const setupStatus = useSelector(state => state.settings.setupStatus);
  const dispatch = useDispatch();

  const _loadPages = async ()=>{
    const fbPages = await FacebookService.pages();
    setPages(fbPages);
  }

  useEffect(()=>{
    if(setupStatus && setupStatus.complete){
      return history.replace('/dashboard');
    }
  }, [setupStatus]);

  useEffect(()=>{
    dispatch(getAccountSetupStatus());
    _loadPages()
  }, []);

  const _changePageState = (changePage, state)=>{
    const newPages = pages.map(page => {
      if(page.id == changePage.id){
        page.state = state;
      }
      return page;
    })
    setPages(newPages);
  }

  const _pageSetup = (page)=>{
    if(page.state == STATE.SUCCESS){
      return;
    }

    _changePageState(page, STATE.LOADING);
    FacebookService.pageSetup(page).then((response)=>{
      _changePageState(page, STATE.SUCCESS);
      setContinueEnabled(true);
    }).catch(()=>{
      _changePageState(page, STATE.ERROR);
    })
  }

  const _completeSetup = ()=>{
    AccountService.completeSetup().then(response=>{
      if(response && response.success){
        return history.replace('/dashboard');
      }
      alert('Error');
    })
  }

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
                          <CListGroupItem className="justify-content-between flex-row" style={{display: 'flex'}} key={page.id}>
                            <div className="flex-fill">
                              {page.name}<br/>
                              <span className="text-mute">{page.category}</span>
                            </div>
                            {
                              page.state == STATE.SUCCESS ? (<CButton variant="outline" shape="pill" color="light" disabled>Success</CButton>) : (
                                <ProgressButton className="float-right" onClick={()=> _pageSetup(page)} state={page.state}>
                                  Setup
                                </ProgressButton>
                              )
                            }
                          </CListGroupItem>
                        )
                      })
                    }
                  </CListGroup>
                  <div className="mt-3 text-center">
                    <CButton shape="pill" color={!continueEnabled ? "light" : 'primary'} disabled={!continueEnabled} onClick={_completeSetup}>Continue</CButton>
                  </div>
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
