import React, { useState, useEffect } from "react";
import {TableContainer, Paper, TableHead, TableBody, Table, TableRow, TableCell, TablePagination, Hidden, Grid, TextField, Fab} from "@material-ui/core";
import ControlTyping from "../Tool/ControlTyping";
import style from '../Tool/Style';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../contexto/store';
import { paginacionAlumno , editarAlumno, eliminarAlumno, pdfAlumno } from '../../actions/AlumnoAction';
import GetAppIcon from '@material-ui/icons/GetApp';

import {ExportExcel} from './ExportExcel'
var list = [];

const PaginadorLista = () => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#009900",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [{sesionUsuario}, dispatch]  = useStateValue();
  const [data, setData] = useState([]);
  const fileName = "ListaAlumnos";

  const [textoBusquedaAlumno, setTextoBusquedaAlumno] = useState("");
  const typingBuscadorTexto = ControlTyping(textoBusquedaAlumno, 900);

  const [paginadorRequest, setPaginadorRequest] = useState({
    titulo: "",
    numeroPagina: 0,
    cantidadElementos: 5,
  });

  const [paginadorResponse, setPaginadorResponse] = useState({
    listaRecords: [],
    totalRecords: 0,
    numeroPaginas: 0,
  });

  useEffect(() => {

    const obtenerListaInstructor = async () => {

      let nombreVariant = "";
      let paginaVariant = paginadorRequest.numeroPagina + 1;

      if(typingBuscadorTexto){
        nombreVariant = typingBuscadorTexto;
        paginaVariant = 1
      }

      const objetoPaginadorRequest = {
        nombre: nombreVariant,
        numeroPagina: paginaVariant,
        cantidadElementos: paginadorRequest.cantidadElementos,
      };

      const response = await paginacionAlumno(objetoPaginadorRequest);
      setPaginadorResponse(response.data);
    };

    obtenerListaInstructor();
  }, [paginadorRequest, typingBuscadorTexto]);

  list = paginadorResponse.listaRecords;
    console.log('lista alumoslista');
    console.log(list);

  const cambiarPagina = (event, nuevaPagina) => {
    setPaginadorRequest((anterior) => ({
      ...anterior,
      numeroPagina: parseInt(nuevaPagina),
    }));
  };
  
  const cambiarCantidadRecords = (event) => {
    setPaginadorRequest((anterior) => ({
      ...anterior,
      cantidadElementos: parseInt(event.target.value),
      numeroPagina: 0,
    }));
  };

  return (
      <div style={{padding:"10px", width:"100%"}} className="container">
        <div style={style.paper}>
        <h2>Lista de Alumnos</h2>
        </div>
        <Grid container style={{paddingTop:"20px", paddingBottom:"20px"}}>
          <Grid item xs={12} sm={4} md={24}>
              <TextField 
                fullWidth
                name="textoBusquedaAlumno"
                variant="outlined"
                label="Buscar Alumno"
                onChange = {e => setTextoBusquedaAlumno(e.target.value)}
              />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">AlumnoID</StyledTableCell>
                <StyledTableCell align="left">Alumno</StyledTableCell>
                <Hidden mdDown>
                  <StyledTableCell align="left">Apellidos</StyledTableCell>
                  
                  <StyledTableCell align="left">Edad</StyledTableCell>
                  <StyledTableCell align="left">Telefono</StyledTableCell>
                  <StyledTableCell align="left">Sexo</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Escuela Procedencia</StyledTableCell>
                  <StyledTableCell align="left">Grado Estudios</StyledTableCell>
                  <StyledTableCell align="left">InstructorID</StyledTableCell>
                  <StyledTableCell align="left">Examen Valorativo</StyledTableCell>
                  <StyledTableCell align="left">Fecha Examen</StyledTableCell>
                  <StyledTableCell align="left">Lugar Examen</StyledTableCell>
                  <StyledTableCell align="left">Meta Inicio</StyledTableCell>
                  <StyledTableCell align="left">Curso Especial</StyledTableCell>
                  <StyledTableCell align="left">Nivel Inscrito</StyledTableCell>
                  <StyledTableCell align="left">Libro</StyledTableCell>
                  <StyledTableCell align="left">Fecha Inscripcion</StyledTableCell>
                  <StyledTableCell align="left">Tipo Pago</StyledTableCell>
                  <StyledTableCell align="left">Precio</StyledTableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginadorResponse.listaRecords.map((alumno) => (
                
                <TableRow key={alumno.nombreAlumno, alumno.id}>
                  <TableCell align="left">{alumno.AlumnoId}</TableCell>
                  <TableCell align="left">{alumno.NombreAlumno}</TableCell>

                  <Hidden mdDown>
                      <TableCell align="left">{alumno.ApellidosAlumno}</TableCell>
                      
                      <TableCell align="left">{alumno.Edad}</TableCell>
                      <TableCell align="left">{alumno.Telefono}</TableCell>
                      <TableCell align="left">{alumno.Sexo}</TableCell>
                      <TableCell align="left">{alumno.EmailAlumno}</TableCell>
                      <TableCell align="left">{alumno.EscuelaProcedencia}</TableCell>
                      <TableCell align="left">{alumno.GradoEstudio}</TableCell>
                      <TableCell align="left">{alumno.InstructorId}</TableCell>
                      <TableCell align="left">{alumno.ExamenValorativo}</TableCell>
                      <TableCell align="left">{alumno.FechaExamen}</TableCell>
                      <TableCell align="left">{alumno.LugarExamen}</TableCell>
                      <TableCell align="left">{alumno.MetaInicio}</TableCell>
                      <TableCell align="left">{alumno.CursoEspecial}</TableCell>
                      <TableCell align="left">{alumno.NivelInscrito}</TableCell>
                      <TableCell align="left">{alumno.Libro}</TableCell>
                      <TableCell align="left">{alumno.FechaInscripcion}</TableCell>
                      <TableCell align="left">{alumno.TipoPago}</TableCell>
                      <TableCell align="left">{alumno.Precio}</TableCell>                    
                  </Hidden>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={paginadorResponse.totalRecords}
          rowsPerPage={paginadorRequest.cantidadElementos}
          page={paginadorRequest.numeroPagina}
          onChangePage={cambiarPagina}
          onChangeRowsPerPage={cambiarCantidadRecords}
          labelRowsPerPage="Alumnos por pagina"
        />

        <div style={style.paper}>
          <form style={style.form}></form>
          <Fab  
              style={style.submit} 
              variant="extended" 
              color="primary" 
              aria-label="add" 
              className={classes.margin} 
              onClick = {pdfAlumno}
              >
              <GetAppIcon className={classes.extendedIcon} />
              PDF
          </Fab>
          <div className="App">
              <ExportExcel apiData={list} fileName={fileName} />
            </div>
        </div>   
    </div>
  );
};

export default PaginadorLista;

