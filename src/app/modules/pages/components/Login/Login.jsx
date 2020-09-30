import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
// import { GoogleLogin } from 'react-google-login';
// import GitHubLogin from 'react-github-login';
import { GoogleLoginButton, GithubLoginButton, LinkedInLoginButton } from 'react-social-login-buttons';
import { TextField } from '@material-ui/core';
import Button from './../../../components/Button/Button';
import { Container, LoginsContainer } from './styled';
import logo from './../../../../../assets/img/logo.png';
import { loginRequest } from "app/modules/store/actions/actions";
// import GoogleButton from './../../../components/GoogleButton/GoogleButton';

const Login = ({ loginRequest }) => {

  const history = useHistory();

  const [loginLocal, setLoginLocal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, control } = useForm();

  const handleClickButton = () => {
    handleLogin();
    // console.log('click');
    // let form = document.getElementById("form");
    // form.submit();
  }

  const handleLogin = () => {
    // loginRequest({ email, password });
    history.push('/');
  }

  const handleResponseLogin = (response) => {
    console.log(JSON.stringify(response));
  }

  return (
      <Container>
        <div className="wrapper">
          <div className="logo">
            <img src={logo} alt="Sprint Break" />
          </div>
          { !loginLocal ? (<LoginsContainer>

            <h4>Elegí cómo ingresar:</h4>

            <GoogleLoginButton />
            <GithubLoginButton />
            <LinkedInLoginButton />


            {/* <GoogleButton
              text="Entrar con Google" 
              onSuccessAction={handleResponseLogin} 
              onFailureAction={handleResponseLogin} 
            /> */}
            {/* <GoogleLogin
              clientId="745067876751-jb04lf20eopl38g1jrk2mqhqb881eidj.apps.googleusercontent.com"
              onSuccess={handleResponseLogin} 
              onFailure={handleResponseLogin} 
              cookiePolicy={'single_host_origin'}
              render={ renderProps => (
                <GoogleLoginButton onClick={renderProps.onClick} />
              )}
            />
            <GitHubLogin 
              clientId="308eda919031d2d7a7f7"
              onSuccess={handleResponseLogin}
              onFailure={handleResponseLogin}
              render={renderProps => (
                <GithubLoginButton onClick={renderProps.onClick} />
              )}
            />
            <LinkedInLoginButton /> */}

          </LoginsContainer>) : null }

          { !loginLocal ?
            (<Button className="new-user" onClick={()=>setLoginLocal(true)}>Ingresar usuario</Button>) : null }

          { loginLocal ? 
            (<form id="form" noValidate onSubmit={handleSubmit(handleLogin)}>
              <h4>Ingresá tus datos de acceso:</h4>
              <div className="input-group">              
                <TextField
                  inputRef={register} 
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  onChange={e => setPassword(e.target.value)}
                  inputRef={register}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <Button className="button" onClick={handleClickButton}>Entrar</Button>
                </div>
            </form>) : null }
        </div>
      </Container>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      loginRequest: data => dispatch(loginRequest(data)),
  }
}

export default connect(null, mapDispatchToProps)(Login);
