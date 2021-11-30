import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import style from '../Tool/Style';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {v4 as uuidv4} from 'uuid';
import {guardarAlumno} from '../../actions/AlumnoAction';
import { useStateValue } from '../../contexto/store';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';

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

const NuevoAlumno = () => {
    const classes = useStyles();
    const [{sesionUsuario}, dispatch]  = useStateValue();
    
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [fechaSeleccionadaIngreso, setFechaSeleccionadaIngreso] = useState(new Date());
    const [fechaSeleccionadaExamen, setFechaSeleccionadaExamen] = useState(new Date());

    const currencies = [
        {
          value: 'F',
          label: 'Femenino',
        },
        {
          value: 'M',
          label: 'Masculino',
        },
    ];
    const currencies1 = [
        {
          value: 'Si',
          label: 'Si',
        },
        {
          value: 'No',
          label: 'No',
        },
    ];
    const currencies2 = [
        {
          value: 'Mensual',
          label: 'Mensual',
        },
        {
          value: 'Semanal',
          label: 'Semanal',
        },
    ];

    const [alumno, setAlumno] = useState({
        NombreAlumno : '',
        ApellidosAlumno : '',
        FechaNacimiento : '',
        Edad : 0,
        Sexo : '',
        Telefono : 0,
        EmailAlumno : '',
        EscuelaProcedencia : '',
        GradoEstudio : '',
        InstructorId : '',
        ExamenValorativo : '',
        FechaExamen : '',
        LugarExamen : '',
        MetaInicio : 0,
        CursoEspecial : '',
        NivelInscrito : '',
        Libro : 0,
        FechaInscripcion : '',
        TipoPago : '',
        Precio : 0
    })

    const resetearForm = () => {
        setFechaSeleccionada(new Date());
        setFechaSeleccionadaIngreso(new Date());
        setFechaSeleccionadaExamen(new Date());
        setAlumno({
            NombreAlumno : '',
            ApellidosAlumno : '',
            FechaNacimiento : '',
            Edad : 0,
            Sexo : '',
            Telefono : 0,
            EmailAlumno : '',
            EscuelaProcedencia : '',
            GradoEstudio : '',
            InstructorId : '',
            ExamenValorativo : '',
            FechaExamen : '',
            LugarExamen : '',
            MetaInicio : 0,
            CursoEspecial : '',
            NivelInscrito : '',
            Libro : 0,
            FechaInscripcion : '',
            TipoPago : '',
            Precio : 0
        })
    }

    const ingresarValoresMemoria = e => {
        const {name,value} = e.target;
        setAlumno( (anterior) => ({
            ...anterior,
            [name]:value
        }));
    }

    const guardarAlumnoBoton = e => {
        e.preventDefault();
        //const alumnoId = uuidv4();

        const objetoAlumno = {
            NombreAlumno : alumno.NombreAlumno,
            ApellidosAlumno : alumno.ApellidosAlumno,
            FechaNacimiento : fechaSeleccionada,
            Edad : parseInt(alumno.Edad),
            Sexo : alumno.Sexo,
            Telefono : parseInt(alumno.Telefono),
            EmailAlumno : alumno.EmailAlumno,
            EscuelaProcedencia : alumno.EscuelaProcedencia,
            GradoEstudio : alumno.GradoEstudio,
            InstructorId : parseInt(alumno.InstructorId),
            ExamenValorativo : alumno.ExamenValorativo,
            FechaExamen : fechaSeleccionadaExamen,
            LugarExamen : alumno.LugarExamen,
            MetaInicio : parseInt(alumno.MetaInicio),
            CursoEspecial : alumno.CursoEspecial,
            NivelInscrito : alumno.NivelInscrito,
            Libro : parseInt(alumno.Libro),
            FechaInscripcion : fechaSeleccionadaIngreso,
            TipoPago : alumno.TipoPago,
            Precio : parseInt(alumno.Precio),
            //alumnoId :parseInt(alumnoId)
        };

        guardarAlumno(objetoAlumno).then(respuestas => {
            const responseAlumno = respuestas[0];
            let mensaje = "";

            if(responseAlumno.status === 200){
                mensaje += "Se guardo exitosamente el nuevo alumno"
                resetearForm();
            }else{
                mensaje += "Errores :" + Object.keys(responseAlumno.response.data.errors);
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
                        <div className="flex-row"></div>
                        <div className="flex-large">

                            <Box mt={5}>
                                <h3>Datos generales del alumno(a)</h3>
                            </Box>
                            
                            <div style={style.paper}>
                                <form style={style.form}>
                                    <Box mt={2}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} md={4}>
                                                <TextField 
                                                    name="InstructorId"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="ID del instructor encargado"
                                                    value = {alumno.InstructorId}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box mt={5}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <TextField 
                                                    name="NombreAlumno"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Ingrese Nombre(s)"
                                                    value = {alumno.NombreAlumno}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField 
                                                    name="ApellidosAlumno"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Apellidos"
                                                    value = {alumno.ApellidosAlumno}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        value={fechaSeleccionada}
                                                        onChange={setFechaSeleccionada}
                                                        //margin="normal"
                                                        id="fecha-nacimiento-id"
                                                        label="Ingrese su Fecha Nacimiento"
                                                        format="dd/MM/yyyy"
                                                        fullWidth
                                                        KeyboardButtonProps = {{
                                                            "aria-label" : "change date"
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <TextField 
                                                    name="Edad"
                                                    variant="outlined"
                                                    //fullWidth
                                                    label="Edad"
                                                    value = {alumno.Edad}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <TextField
                                                    name="Sexo"
                                                    variant="outlined"
                                                    select
                                                    fullWidth
                                                    label="Sexo"
                                                    value = {alumno.Sexo}
                                                    onChange={ingresarValoresMemoria}
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
                                                    name="Telefono"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Telefono (10 digitos)"
                                                    value = {alumno.Telefono}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField 
                                                    name="EmailAlumno"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Email"
                                                    value = {alumno.EmailAlumno}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <TextField 
                                                    name="EscuelaProcedencia"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Escuela de Procedencia"
                                                    value = {alumno.EscuelaProcedencia}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <TextField 
                                                    name="GradoEstudio"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Grado de Estudio"
                                                    value = {alumno.GradoEstudio}
                                                    onChange={ingresarValoresMemoria}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                
                                
                                </form>
                            </div>
                        </div>
                        <div className="flex-large">
                            <Box mt={5}>
                                <h2>Datos de ingreso al curso</h2>
                            </Box>
                            
                            <div style={style.paper}>
                                <form style={style.form}></form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            name="ExamenValorativo"
                                            variant="outlined"
                                            select
                                            fullWidth
                                            label="Examen valorativo"
                                            value = {alumno.ExamenValorativo}
                                            onChange={ingresarValoresMemoria}
                                            >
                                            {currencies1.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField 
                                            name="LugarExamen"
                                            variant="outlined"
                                            fullWidth
                                            label="Lugar donde presento el Examen"
                                            value = {alumno.LugarExamen}
                                            onChange={ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                value={fechaSeleccionadaExamen}
                                                onChange={setFechaSeleccionadaExamen}
                                                //margin="normal"
                                                id="fecha-examen-id"
                                                label="Fecha de Examen Valorativo"
                                                format="dd/MM/yyyy"
                                                fullWidth
                                                KeyboardButtonProps = {{
                                                    "aria-label" : "change date"
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={2}>
                                        <TextField 
                                            name="MetaInicio"
                                            variant="outlined"
                                            fullWidth
                                            label="Meta de Inicio"
                                            value = {alumno.MetaInicio}
                                            onChange={ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            name="CursoEspecial"
                                            variant="outlined"
                                            select
                                            fullWidth
                                            label="Curso Especial"
                                            value = {alumno.CursoEspecial}
                                            onChange={ingresarValoresMemoria}
                                            >
                                            {currencies1.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            name="NivelInscrito"
                                            variant="outlined"
                                            fullWidth
                                            label="Nivel de ingles"
                                            value = {alumno.NivelInscrito}
                                            onChange={ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            name="Libro"
                                            variant="outlined"
                                            fullWidth
                                            label="Número de Libro"
                                            value = {alumno.Libro}
                                            onChange={ingresarValoresMemoria}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                value={fechaSeleccionadaIngreso}
                                                onChange={setFechaSeleccionadaIngreso}
                                                //margin="normal"
                                                id="fecha-ingreso-id"
                                                label="Fecha de ingreso a Curso"
                                                format="dd/MM/yyyy"
                                                fullWidth
                                                KeyboardButtonProps = {{
                                                    "aria-label" : "change date"
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            name="TipoPago"
                                            variant="outlined"
                                            select
                                            fullWidth
                                            label="Tipo de pago"
                                            value = {alumno.TipoPago}
                                            onChange={ingresarValoresMemoria}
                                            >
                                            {currencies2.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            name="Precio"
                                            variant="outlined"
                                            fullWidth
                                            label="Ingrese Precio a Pagar"
                                            value = {alumno.Precio}
                                            onChange={ingresarValoresMemoria}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="center">
                                    <Grid item xs={12} md={6}>
                                        <Box mt={5}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                startIcon={<SaveIcon />}
                                                style={style.submit}
                                                onClick = {guardarAlumnoBoton}
                                            >
                                                Guardar Alumno
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
                </CardContent>
            </Card>
        </div>
    );
};

export default NuevoAlumno;