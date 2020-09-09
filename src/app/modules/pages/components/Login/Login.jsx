import React from "react";
import { Button } from '@santander/everest-ui';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from 'react-hook-form';
import logo from './../../../../../assets/img/logo.png';

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

export default function SignIn() {
  const classes = useStyles();

  const { register, handleSubmit, control } = useForm();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="Sprint Break" />
        <form className={classes.form} noValidate
        onSubmit={handleSubmit((data)=>alert(JSON.stringify(data)))}
        >
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register} 
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
