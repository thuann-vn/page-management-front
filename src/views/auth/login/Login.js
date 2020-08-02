import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { AuthService } from '../../../services/auth'
import FacebookLogin from 'react-facebook-login'
import Config from '../../../constants/Config'
import { login } from '../../../store/actions/settingsActions';

const Login = ({history}) => {
  const dispatch = useDispatch();

  const facebookLogin = useCallback(
    (result) => {
      AuthService.facebookLogin(result).then((result)=>{
        if(result.success){
          localStorage.setItem('userToken', result.token);
          dispatch(login(result.profile, result.token));
          history.replace('/dashboard');
        }else{
          alert('Login failed, please try again!');
        }
      });
    },[]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign in and Sign Up</h2>
                    <p>Connect to your facebook account and continue...</p>
                      
                      <FacebookLogin
                        size="metro"
                        appId={Config.facebookID}
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="pages_manage_posts,pages_messaging,pages_read_user_content,pages_show_list"
                        callback={facebookLogin}
                      />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
