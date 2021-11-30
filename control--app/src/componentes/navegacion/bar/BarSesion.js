import React, { useState, useEffect } from "react";
import { Toolbar, IconButton, Typography, makeStyles, Button, Avatar, Drawer, List, ListItem, ListItemText,Divider} from "@material-ui/core";
import FotoUsuarioTemp from "../../../logo.svg";
import { useStateValue } from "../../../contexto/store";
import { MenuIzquierda } from "./menuIzquierda";
import {MenuDerecha} from './menuDerecha';
import { withRouter, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  seccionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      
    },
  },
  seccionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
      
    },
  },
  grow: {
    flexGrow: 1,
    
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
    
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    
  },
}));

const BarSesion = (props) => {
  const classes = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);

  const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);

  const abrirMenuIzquierdaAction = () => {
    setAbrirMenuIzquierda(true);
  };

  const cerrarMenuIzquierda = () => {
    setAbrirMenuIzquierda(false);
  };

  const abrirMenuDerechaAction = () => {
    setAbrirMenuDerecha(true);
  }

  const cerrarMenuDerecha = () => {
    setAbrirMenuDerecha(false);
  };

  const salirSesionApp = () => {
    console.log('salir sesion');
    localStorage.removeItem("token_seguridad");

    dispatch({
       type : "SALIR_SESION",
       nuevoUsuario : null,
       autenticado : false
    })

    props.history.push("/auth/login");
  };

  const [isDropdownvVisible, toogleDropdownVisibility] = useState(false);

  function handleClick() {
    let payload = window.localStorage.getItem('token_seguridad');
    console.log(payload);
    payload = payload.split(".")[1]
    let temp =  window.atob(payload)
    let nya = JSON.parse(temp)
    console.log(nya)
    console.log(nya.role)
    let rol = nya.role
    console.log(rol)
    if(rol == 'Admi'){
      return toogleDropdownVisibility(!isDropdownvVisible)
    }else{
      console.log("No tienes permiso")
    }
    
  }

  useEffect(() => {
    console.log(isDropdownvVisible);
  })

  return (
    <React.Fragment  >
      <Drawer
        open={abrirMenuIzquierda}
        onClose={cerrarMenuIzquierda}
        anchor="left"
        
      >
        <div
          //className={classes.list}
          //onKeyDown={cerrarMenuIzquierda}
          //onClick={cerrarMenuIzquierda}
          
        >
          <List>
            <ListItem button onClick={handleClick}> 
              <i className="material-icons">lock</i>
              <ListItemText classes={{primary: classes.listItemText}} />
                {isDropdownvVisible && (
                  <MenuIzquierda classes={classes} />
                )}
            </ListItem>
          </List>
        </div>

        <div className = {classes.list}>
          <div>
            <List>
                <ListItem component={Link} button to="/auth/perfil">
                    <i className="material-icons">account_box</i>
                    <ListItemText classes={{primary: classes.listItemText}} primary="Mi Perfil" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem component={Link} button  to="/alumno/nuevo">
                    <i className="material-icons">person_add</i>
                    <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Alumno" />
                </ListItem>
            </List>
            <List>
              <ListItem component={Link} button to="/alumno/listaAlumno">
                  <i className="material-icons">list_alt</i>
                  <ListItemText classes={{primary: classes.listItemText}} primary="Lista Alumnos"/>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>

      <Drawer
        open={abrirMenuDerecha}
        onClose={cerrarMenuDerecha}
        anchor="right"
        
      >
        <div
          className={classes.list}
          onClick={cerrarMenuDerecha}
          onKeyDown={cerrarMenuDerecha}
          
        >
          <MenuDerecha
            
            classes={classes} 
            salirSesion={salirSesionApp} 
            usuario = { sesionUsuario ? sesionUsuario.usuario : null}
            />
        </div>
      </Drawer>
    
      <Toolbar style={{ background: "#1976d2" }} >
        <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
          <i className="material-icons">menu_open</i>
        </IconButton>

        <Typography variant="h6">Control Escolar</Typography>
        <div className={classes.grow}></div>
         
        <div className={classes.seccionDesktop}>
          <Button color="inherit" onClick={salirSesionApp}>Salir</Button>
          <Button color="inherit">
            {sesionUsuario ? sesionUsuario.usuario.userName : ""}
          </Button>
          <Avatar src={sesionUsuario.usuario.imagenPerfil ||  FotoUsuarioTemp}></Avatar>
        </div>

        <div className={classes.seccionMobile}>
          <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};

export default withRouter(BarSesion);

