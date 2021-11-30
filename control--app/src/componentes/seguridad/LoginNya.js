import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import descarga from '../../assets/img/YouLEAD.jpg';
import {loginUsuario} from '../../actions/UsuarioActions';
import { useStateValue } from '../../contexto/store';
import { Toolbar, IconButton, Typography, makeStyles, Button, Avatar, Drawer, List, ListItem, ListItemText,Divider} from "@material-ui/core";
import style from '../Tool/Style';

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © YouLEAD  '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '50vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundPosition: 'center',
      
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [{usuarioSesion}, dispatch]  = useStateValue();

    const [usuario, setUsuario] = useState({
        Email : '',
        Password : ''
    })

    const ingresarValoresMemoria = e => {
        const {name,value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }))
    }

    const loginUsuarioBoton = e => {
        e.preventDefault();
        loginUsuario(usuario, dispatch).then(response => {
            console.log('response.data.token', response.data.token);
            if(response.status === 200) {
                window.localStorage.setItem('token_seguridad', response.data.token);
                props.history.push("/");
            }else{
                dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje : {
                        open : true,
                        mensaje : "Las credenciales del usuario son incorrectas"
                    }
                })
            }
        })
    }

  return (
    
    <Grid container component="main" >
      <CssBaseline />
      <Grid item xs={false} sm={2} md={7} className={classes.image} >
        <img src={descarga} style={{height:'95vh'}} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <form className={classes.form} noValidate>
            <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="outlined" label="Email" fullWidth margin="normal"/>
            <TextField name="Password" value={usuario.Password} onChange={ingresarValoresMemoria} variant="outlined" type="password"  label="Password" fullWidth margin="normal" />
            
            <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign In
            </Button>

            <Box mt={30}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}