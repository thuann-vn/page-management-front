import React from 'react'
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

const Login = () => {
  const [email] = React.useState('');
  const [password] = React.useState('');
  const dispatch = useDispatch();

  const login = React.useCallback(()=>{
    AuthService.login(email, password).then(()=>{
      dispatch(login())
    })
  },[])

  const facebookLogin = (result)=>{
    AuthService.facebookLogin(result).then((result)=>{
      if(result.success){
        localStorage.setItem('userToken', result.token);
        dispatch(login(result.profile, result.token));
      }else{
        alert('Login failed, please try again!');
      }
    });
   }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <FacebookLogin
                      size="small"
                      appId={Config.facebookID}
                      autoLoad={true}
                      fields="name,email,picture"
                      callback={facebookLogin}
                    />
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
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
