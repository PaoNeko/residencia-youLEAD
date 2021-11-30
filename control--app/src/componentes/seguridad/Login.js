import React, { useState } from 'react';
import style from '../Tool/Style';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {loginUsuario} from '../../actions/UsuarioActions';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../contexto/store';
import descarga from '../../assets/img/YouLEAD.jpg';

const Login = (props) => {
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
       <Container maxWidth="xs">
           <div style={style.paper}>
               <div>
               <Typography component="div" variant="h1"  style={{  height: '25vh' }}>
                    <img 
                        src={descarga} 
                        alt=""  
                        height={"650"}
                        width={"600"} 
                    />
                </Typography>
               </div>
                
                
                <Typography component="h1" variant="h5">
                    Login de Usuario
                </Typography>
                <form style={style.form}>
                    <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="outlined" label="Email" fullWidth margin="normal"/>
                    <TextField name="Password" value={usuario.Password} onChange={ingresarValoresMemoria} variant="outlined" type="password"  label="Password" fullWidth margin="normal" />
                    <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" style={style.submit}>
                        Ingresar
                    </Button>
                </form>

           </div>
       </Container>
    );
};

export default  withRouter(Login);