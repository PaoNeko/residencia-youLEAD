import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';

export const MenuIzquierda = ({classes}) => (
    <div className = {classes.list}>
        <List>
            
            <ListItem component={Link} button to="/auth/registrar">
                <i className="material-icons">account_circle</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Configuracion Usuarios" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button  to="/instructor/nuevo">
                 <i className="material-icons">person_add</i>
                 <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Instructor" />
            </ListItem>
            <ListItem component={Link} button to="/instructor/paginador">
                <i className="material-icons">list_alt</i>
                <ListItemText classes={{primary: classes.listItemText}} primary ="Lista de Instructores" />
            </ListItem>
        </List>
        <Divider />
        <List>            
            <ListItem component={Link} button to="/alumno/paginador">
                <i className="material-icons">list_alt</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Lista Alumnos"/>
            </ListItem>
        </List>
    </div>
);