import React, { useState } from 'react';
import {Container, Typography, Grid, TextField, Button} from '@material-ui/core';
import style from '../Tool/Style';
import ImageUploader from 'react-images-upload';
import {v4 as uuidv4} from 'uuid';
import {obtenerDataImagen} from '../../actions/ImageAction';
import { guardarInstructor } from '../../actions/InstructorAction';
import { useStateValue } from '../../contexto/store';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

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
submit: {
    margin: theme.spacing(3, 0, 2),
},
}));


const NuevoInstructor = () => {
    const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
    });

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [{sesionUsuario}, dispatch]  = useStateValue();
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

    const currencies = [
        {
          value: 'Master',
          label: 'Master',
        },
        {
          value: 'Socio',
          label: 'Socio',
        },
        {
          value: 'Master-Socio',
          label: 'Master-Socio',
        },
      ];

    const [instructor, setInstructor] = useState({
        Nombre : '',
        Apellidos : '',
        TelefonoM : '',
        Email : '',
        CentroAprendizaje : '',
        CantAlumnos : 0,
        Categoria : '',
        UplineMaster : '',
        ClaveInstructor : '',
        ClaveUpline : ''
    });

    const resetearForm = () => {
        setFechaSeleccionada(new Date());
        setInstructor({
            Nombre : '',
            Apellidos : '',
            TelefonoM : '',
            Email : '',
            CentroAprendizaje : '',
            CantAlumnos : 0,
            Categoria : '',
            UplineMaster : '',
            ClaveInstructor : '',
            ClaveUpline : ''
        })
    }

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;

         setInstructor( (anterior) => ({
             ...anterior,
             [name] : value
         })); 
    }

    const guardarInstructorBoton = e => {
        e.preventDefault();
        //const instructorId = uuidv4();

        const objetoInstructor = {
            Nombre : instructor.Nombre,
            Apellidos : instructor.Apellidos,
            TelefonoM : parseInt(instructor.TelefonoM),
            Email : instructor.Email,
            CentroAprendizaje : instructor.CentroAprendizaje,
            CantAlumnos : parseInt(instructor.CantAlumnos),
            Categoria : instructor.Categoria,
            UplineMaster : instructor.UplineMaster,
            ClaveInstructor : instructor.ClaveInstructor,
            ClaveUpline : instructor.ClaveUpline,
	        //instructorId : instructorId 
        };     

        guardarInstructor(objetoInstructor).then(respuestas => {
            const responseInstructor = respuestas[0];
            let mensaje = "";

            if(responseInstructor.status === 200) {
                mensaje += "Se guardo exitosamente el nuevo instructor"
                resetearForm();
            }else{
                mensaje += "Errores :" + Object.keys(responseInstructor.response.data.errors);
            }
            
            dispatch({
                type : "OPEN_SNACKBAR",
                openMensaje : {
                    open : true,
                    mensaje : mensaje
                }
            })

        })
    }

    return (
        <div style={style.paper} className="container">
            <Card className={classes.root} style={{ background: "#009900" }}>
            <CardContent >
                <div style={style.paper} className="container">
                    <h2>Cédula de registro</h2>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h3>Datos generales del Instructor</h3>
                            <div style={style.paper}>
                                <form style={style.form}></form>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            name="Nombre"
                                            //variant="outlined"
                                            fullWidth
                                            label="Ingrese Nombre(s)"
                                            value = {instructor.Nombre}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField 
                                            name="Apellidos"
                                            //variant="outlined"
                                            fullWidth
                                            label="Apellidos"
                                            value = {instructor.Apellidos}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            name = "TelefonoM"
                                            //variant="outlined"
                                            fullWidth
                                            label="Telefono"
                                            value = {instructor.TelefonoM}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField 
                                            name = "Email"
                                            //variant="outlined"
                                            fullWidth
                                            label="Email"
                                            value = {instructor.Email}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField 
                                            name="CentroAprendizaje"
                                            //variant="outlined"
                                            fullWidth
                                            label="Ingresar CentroAprendizaje"
                                            value = {instructor.CentroAprendizaje}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <TextField 
                                            name="CantAlumnos"
                                            type="number"
                                            fullWidth
                                            label = "Cantidad Alumnos"
                                            value = {instructor.CantAlumnos}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            name="Categoria"
                                            //variant="outlined"
                                            select
                                            fullWidth
                                            label="Categoria"
                                            value = {instructor.Categoria}
                                            onChange={ingresarValoresMemoria}
                                            helperText="Please select your category"
                                            >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            name="ClaveInstructor"
                                            //variant="outlined"
                                            fullWidth
                                            label = "Registre su clave de Instructor"
                                            value = {instructor.ClaveInstructor}
                                            onChange={ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            name = "UplineMaster"
                                            //variant="outlined"
                                            fullWidth
                                            label = "UplineMaster"
                                            value = {instructor.UplineMaster}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            name = "ClaveUpline"
                                            //variant="outlined"
                                            fullWidth
                                            label = "Clave de su Upline"
                                            value = {instructor.ClaveUpline}
                                            onChange = {ingresarValoresMemoria}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item xs={12} md={6}>
                                        <Box mt={10}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                startIcon={<SaveIcon />}
                                                style={style.submit}
                                                onClick = {guardarInstructorBoton}
                                            >
                                                Guardar Instructor
                                            </Button>                 
                                        </Box>
                                    </Grid>
                                </Grid>
                                    
                                    
                                <Box mt={10}>
                                    <Copyright />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
                    
            </CardContent>
            </Card>
        </div>
    );
}

export default NuevoInstructor; 