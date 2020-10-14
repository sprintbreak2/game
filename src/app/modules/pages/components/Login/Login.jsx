import React, { useEffect, useState } from "react";
import Websocket from 'react-websocket';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { GoogleLogin } from 'react-google-login';
import { Container, LoginsContainer } from './styled';
import { TextField } from '@material-ui/core';
import { wsDispatch } from '../../../store/actions/wsActions';
import { login, logout, register, authenticateWs, setLoginState, setWebsocket } from './../../../store/actions/loginActions';
import GitHubLogin from 'react-github-login';
import Button from './../../../components/Button/Button';
import logo from './../../../../../assets/img/logo.png';
import config from '../../../../config/config';

const Login = props => {

  const { id, loginAction, registerLogin, dispatchWs, setLoginState, logged, setWebsocketState } = props;

  const history = useHistory();
  const ws = React.createRef();
  const [loginLocal, setLoginLocal] = useState(false);

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [wsAuthenticated, setWsAuthenticated] = useState(false);
  // loginRegister reemplaza el 'register' del ejemplo
  const [loginRegister, setLoginRegister] = useState(false);

  React.useEffect(() => {
    if(logged) {
      setWebsocketState(ws.current);
      history.push("/home");
    }
  }, [logged]);

  const handleLoginWithUser = () => {
    setLoginState({
      origin: "santander",
      nickname: user
    })
    loginAction(id, {
      origin: 'santander',
      data: { 
        username: user, 
        password: pass 
      } 
    }, ws.current)
  }

  const handleRegisterClick = () => {
    setLoginRegister(false);
    registerLogin(id, { data: {
      username: user,
      password: pass,
      email,
      fullname
    }})
  }

  const handleGoogleLoginSuccess = response => {
    setLoginState({
      origin: "google",
      origin_id: response.googleId,
      token: response.idToken
    })
    loginAction(id, { origin: 'google', data: response }, ws.current)
  }
  const handleGoogleLoginFailure = response => {
    console.error(JSON.stringify(response));
  }

  const handleGitHubLoginSuccess = response => {
    console.log(JSON.stringify(response))
    setLoginState({
      origin: "github",
      code: response.code,
    })
    loginAction(id, { origin: 'github', data: response }, ws.current)
  }
  const handleGitHubLoginFailure = response => {
    console.error(JSON.stringify(response));
  }

  const wsOpen = () => {}

  const wsClose = data => {}

  const wsData = data => {
    dispatchWs(id, data, { props, ws: ws.current });
  }

  const wsDataError = (data) => {
    console.error("WS Error", data)
  }

  return (
      <Container>
        <Websocket url={config.api.ws_url}
          debug={false}
          reconnect={true}
          onOpen={wsOpen}
          onClose={wsClose}
          onMessage={wsData}
          onError={wsDataError}
          ref={ws}
        />
        <div className="wrapper">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Sprint Break" />
            </a>
          </div>
          { !loginLocal ? (<LoginsContainer>

            <h4>Elegí cómo ingresar:</h4>

            <GoogleLogin
              clientId="245942166200-hfb8qrm6m9cgip71l5iuteujhnriidn9.apps.googleusercontent.com"
              onSuccess={handleGoogleLoginSuccess} 
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <GoogleLoginButton onClick={renderProps.onClick} />
              )}
            />
            <GitHubLogin
              className="github-button"
              clientId="fd748d5a725cf8407786"
              onSuccess={handleGitHubLoginSuccess}
              onFailure={handleGitHubLoginFailure}
            >
              <GithubLoginButton />
            </GitHubLogin>
           

          </LoginsContainer>) : null }

          { !loginLocal ?
            (<Button className="new-user" onClick={()=>setLoginLocal(true)}>Ingresar usuario</Button>) : null }

          { loginLocal ? 
            (<div className="form">
              <h4>Ingresá tus datos:</h4>
              <div className="input-group">              
                <TextField
                  onChange={e => setUser(e.target.value)}
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username"
                />
                <TextField
                  onChange={e => setPass(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                { loginRegister ? (<TextField
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                />) : null }
                { loginRegister ? (<TextField
                  onChange={e => setFullname(e.target.value)}
                  name="fullname"
                  label="Nombre completo"
                  type="fullname"
                  id="fullname"
                />) : null }
                { !loginRegister && <Button className="button" onClick={handleLoginWithUser}>Entrar</Button> }
                { !loginRegister && <Button className="button" onClick={() => setLoginRegister(true)}>Soy nuevo</Button> }
                { loginRegister && <Button className="button" onClick={handleRegisterClick}>Registrarme</Button> }
                { loginRegister && <Button className="button" onClick={() => setLoginRegister(false)}>Cancelar</Button> }
                </div>
            </div>) : null }
        </div>
      </Container>
  );
}

const mapStateToProps = state => {
  return {
    id: state.appReducer.user_id,
    logged: state.appReducer.logged
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: (id, data, ws) => dispatch(login(id, data, ws)),
    logoutAction: (id, session) => dispatch(logout(id, session)),
    registerLogin: (id, data) => dispatch(register(id, data)),
    dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatch(id, data, { props, ws })),
    setLoginState: (data) => dispatch(setLoginState(data)),
    setWebsocketState: ws => dispatch(setWebsocket(ws))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
