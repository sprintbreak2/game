import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@santander/everest-ui';
import { makeStyles } from "@material-ui/core/styles";
import { LoginsContainer } from './styled';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import logo from './../../../../../assets/img/logo.png';
import { loginRequest } from "app/modules/store/actions/actions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: "1rem auto",
    width: "100%",
  }
}));

const Login = ({ loginRequest }) => {
  
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, control } = useForm();

  const handleLogin = () => {
    loginRequest({ email, password });
    history.push('/');
  }

  const handleGoogleResponse = (response) => {
    console.log(response);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="Sprint Break" />
        <form className={classes.form} noValidate
        onSubmit={handleSubmit(handleLogin)}
        >
          <LoginsContainer>

            {/* Google login */}
            <GoogleLogin 
              buttonText="Entrar con Google" 
              clientId="745067876751-jb04lf20eopl38g1jrk2mqhqb881eidj.apps.googleusercontent.com"
              onSuccess={handleGoogleResponse} 
              onFailure={handleGoogleResponse} 
              cookiePolicy={'single_host_origin'}
            />
            {/* GitHub login */}
            {/* Twitter login */}
            {/* Linkedin login */}

          </LoginsContainer>
          <TextField
            inputRef={register} 
            onChange={e => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            fullWidth
            autoFocus
            required
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            inputRef={register}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <FormControlLabel
            control={
            <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false} />}
            label="Recordar"
          />
          <Button
            text="Ingresar"
            type="submit"
            size="large"
            variant="primary"
            className={classes.submit}
            fullWidth
            />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"No tenés cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>          
        </form>
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
