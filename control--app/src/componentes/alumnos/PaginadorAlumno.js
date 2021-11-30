import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TablePagination,
  Hidden,
  Grid,
  TextField,
  Button,
  Fab,
} from "@material-ui/core";
import ControlTyping from "../Tool/ControlTyping";
import style from "../Tool/Style";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useStateValue } from "../../contexto/store";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  paginacionAlumno,
  editarAlumno,
  eliminarAlumno,
  pdfAlumno,
} from "../../actions/AlumnoAction";
import GetAppIcon from "@material-ui/icons/GetApp";

import { ExportExcel } from "./ExportExcel";
var list = [];

const PaginadorAlumno = () => {
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

  const [{ sesionUsuario }, dispatch] = useStateValue();
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

      if (typingBuscadorTexto) {
        nombreVariant = typingBuscadorTexto;
        paginaVariant = 1;
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
  console.log("lista alumospaginador");
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

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState({
    AlumnoId: "",
    NombreAlumno: "",
    ApellidosAlumno: "",
    FechaNacimiento: "",
    Edad: 0,
    Telefono: 0,
    Sexo: "",
    EmailAlumno: "",
    EscuelaProcedencia: "",
    GradoEstudio: "",
    InstructorId: "",
    ExamenValorativo: "",
    FechaExamen: "",
    LugarExamen: "",
    MetaInicio: 0,
    CursoEspecial: "",
    NivelInscrito: "",
    Libro: 0,
    FechaInscripcion: "",
    TipoPago: "",
    Precio: 0.0,
  });

  const resetearForm = () => {
    setAlumnoSeleccionado({
      AlumnoId: "",
      NombreAlumno: "",
      ApellidosAlumno: "",
      FechaNacimiento: "",
      Edad: 0,
      Telefono: 0,
      Sexo: "",
      EmailAlumno: "",
      EscuelaProcedencia: "",
      GradoEstudio: "",
      InstructorId: "",
      ExamenValorativo: "",
      FechaExamen: "",
      LugarExamen: "",
      MetaInicio: 0,
      CursoEspecial: "",
      NivelInscrito: "",
      Libro: 0,
      FechaInscripcion: "",
      TipoPago: "",
      Precio: 0.0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumnoSeleccionado((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const seleccionarAlumno = (alumno, caso) => {
    setAlumnoSeleccionado(alumno);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const editAlumno = () => {
    alumnoSeleccionado.Edad = +alumnoSeleccionado.Edad;
    alumnoSeleccionado.Telefono = +alumnoSeleccionado.Telefono;
    alumnoSeleccionado.MetaInicio = +alumnoSeleccionado.MetaInicio;
    alumnoSeleccionado.Libro = +alumnoSeleccionado.Libro;
    alumnoSeleccionado.Precio = +alumnoSeleccionado.Precio;
    editarAlumno(alumnoSeleccionado).then((respuestas) => {
      const responseAlumno = respuestas[0];
      let mensaje = "";
      if (responseAlumno.status === 200) {
        mensaje += "Se actualizo exitosamente";
        resetearForm();
        setModalEditar(false);
      } else {
        mensaje +=
          "Errores :" + Object.keys(responseAlumno.response.data.errors);
      }
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: mensaje,
        },
      });
    });
  };

  const eliminar = () => {
    eliminarAlumno(alumnoSeleccionado).then((respuestas) => {
      const responseAlumno = respuestas[0];
      let mensaje = "";
      if (responseAlumno.status === 200) {
        mensaje += "Se elimino exitosamente";
        resetearForm();
      }
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: mensaje,
        },
      });
    });
    setModalEliminar(false);
  };

  return (
    <div style={{ padding: "10px", width: "100%" }} className="container">
      <div style={style.paper}>
        <h2>Lista de Alumnos</h2>
      </div>
      <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid item xs={12} sm={4} md={24}>
          <TextField
            fullWidth
            name="textoBusquedaAlumno"
            variant="outlined"
            label="Buscar Alumno"
            onChange={(e) => setTextoBusquedaAlumno(e.target.value)}
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
                <StyledTableCell align="left">
                  Escuela Procedencia
                </StyledTableCell>
                <StyledTableCell align="left">Grado Estudios</StyledTableCell>
                <StyledTableCell align="left">InstructorID</StyledTableCell>
                <StyledTableCell align="left">
                  Examen Valorativo
                </StyledTableCell>
                <StyledTableCell align="left">Fecha Examen</StyledTableCell>
                <StyledTableCell align="left">Lugar Examen</StyledTableCell>
                <StyledTableCell align="left">Meta Inicio</StyledTableCell>
                <StyledTableCell align="left">Curso Especial</StyledTableCell>
                <StyledTableCell align="left">Nivel Inscrito</StyledTableCell>
                <StyledTableCell align="left">Libro</StyledTableCell>
                <StyledTableCell align="left">
                  Fecha Inscripcion
                </StyledTableCell>
                <StyledTableCell align="left">Tipo Pago</StyledTableCell>
                <StyledTableCell align="left">Precio</StyledTableCell>
                <StyledTableCell align="left">Editar</StyledTableCell>
                <StyledTableCell align="left">Eliminar</StyledTableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginadorResponse.listaRecords.map((alumno) => (
              <TableRow key={(alumno.nombreAlumno, alumno.id)}>
                <TableCell align="left">{alumno.AlumnoId}</TableCell>
                <TableCell align="left">{alumno.NombreAlumno}</TableCell>

                <Hidden mdDown>
                  <TableCell align="left">{alumno.ApellidosAlumno}</TableCell>

                  <TableCell align="left">{alumno.Edad}</TableCell>
                  <TableCell align="left">{alumno.Telefono}</TableCell>
                  <TableCell align="left">{alumno.Sexo}</TableCell>
                  <TableCell align="left">{alumno.EmailAlumno}</TableCell>
                  <TableCell align="left">
                    {alumno.EscuelaProcedencia}
                  </TableCell>
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
                  <TableCell align="left">
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => seleccionarAlumno(alumno, "Editar")}
                      >
                        Editar
                      </button>
                    </td>
                  </TableCell>
                  <TableCell align="left">
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => seleccionarAlumno(alumno, "Eliminar")}
                      >
                        Eliminar
                      </button>
                    </td>
                  </TableCell>
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
          onClick={pdfAlumno}
        >
          <GetAppIcon className={classes.extendedIcon} />
          EXPORT PDF
        </Fab>

        <div className="App">
          <ExportExcel apiData={list} fileName={fileName} />
        </div>
      </div>

      <Modal isOpen={modalEditar}>
        <ModalHeader color="#388e3c">
          <div>
            <h3>Editar Alumno</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="AlumnoId"
              value={alumnoSeleccionado && alumnoSeleccionado.AlumnoId}
              //onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="NombreAlumno"
              value={alumnoSeleccionado && alumnoSeleccionado.NombreAlumno}
              onChange={handleChange}
            />
            <br />

            <label>Apellidos</label>
            <input
              className="form-control"
              type="text"
              name="ApellidosAlumno"
              value={alumnoSeleccionado && alumnoSeleccionado.ApellidosAlumno}
              onChange={handleChange}
            />
            <br />

            <label>Fecha Nacimiento</label>
            <input
              className="form-control"
              type="text"
              name="FechaNacimiento"
              value={alumnoSeleccionado && alumnoSeleccionado.FechaNacimiento}
              onChange={handleChange}
            />
            <br />

            <label>Edad</label>
            <input
              className="form-control"
              type="text"
              name="Edad"
              value={alumnoSeleccionado && alumnoSeleccionado.Edad}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="Telefono"
              value={
                alumnoSeleccionado && parseInt(alumnoSeleccionado.Telefono)
              }
              onChange={handleChange}
            />
            <br />

            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="Sexo"
              value={alumnoSeleccionado && alumnoSeleccionado.Sexo}
              onChange={handleChange}
            />
            <br />

            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="EmailAlumno"
              value={alumnoSeleccionado && alumnoSeleccionado.EmailAlumno}
              onChange={handleChange}
            />
            <br />

            <label>Escuela Procedencia</label>
            <input
              className="form-control"
              type="text"
              name="EscuelaProcedencia"
              value={
                alumnoSeleccionado && alumnoSeleccionado.EscuelaProcedencia
              }
              onChange={handleChange}
            />
            <br />

            <label>Grado Estudios</label>
            <input
              className="form-control"
              type="text"
              name="GradoEstudio"
              value={alumnoSeleccionado && alumnoSeleccionado.GradoEstudio}
              onChange={handleChange}
            />
            <br />

            <label>Instructor Id</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="InstructorId"
              value={alumnoSeleccionado && alumnoSeleccionado.InstructorId}
              onChange={handleChange}
            />
            <br />

            <label>Examen Valorativo</label>
            <input
              className="form-control"
              type="text"
              name="ExamenValorativo"
              value={alumnoSeleccionado && alumnoSeleccionado.ExamenValorativo}
              onChange={handleChange}
            />
            <br />

            <label>Fecha Examen</label>
            <input
              className="form-control"
              type="text"
              name="FechaExamen"
              value={alumnoSeleccionado && alumnoSeleccionado.FechaExamen}
              onChange={handleChange}
            />
            <br />

            <label>Lugar Examen</label>
            <input
              className="form-control"
              type="text"
              name="LugarExamen"
              value={alumnoSeleccionado && alumnoSeleccionado.LugarExamen}
              onChange={handleChange}
            />
            <br />

            <label>Meta Inicio</label>
            <input
              className="form-control"
              type="text"
              name="MetaInicio"
              value={alumnoSeleccionado && alumnoSeleccionado.MetaInicio}
              onChange={handleChange}
            />
            <br />

            <label>Curso Especial</label>
            <input
              className="form-control"
              type="text"
              name="CursoEspecial"
              value={alumnoSeleccionado && alumnoSeleccionado.CursoEspecial}
              onChange={handleChange}
            />
            <br />

            <label>Nivel Inscrito</label>
            <input
              className="form-control"
              type="text"
              name="NivelInscrito"
              value={alumnoSeleccionado && alumnoSeleccionado.NivelInscrito}
              onChange={handleChange}
            />
            <br />

            <label>Libro</label>
            <input
              className="form-control"
              type="text"
              name="Libro"
              value={alumnoSeleccionado && alumnoSeleccionado.Libro}
              onChange={handleChange}
            />
            <br />

            <label>Fecha Inscripcion</label>
            <input
              className="form-control"
              type="text"
              name="FechaInscripcion"
              value={alumnoSeleccionado && alumnoSeleccionado.FechaInscripcion}
              onChange={handleChange}
            />
            <br />

            <label>Tipo Pago</label>
            <input
              className="form-control"
              type="text"
              name="TipoPago"
              value={alumnoSeleccionado && alumnoSeleccionado.TipoPago}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="Precio"
              value={alumnoSeleccionado && alumnoSeleccionado.Precio}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editAlumno()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el Alumno{" "}
          {alumnoSeleccionado && alumnoSeleccionado.NombreAlumno}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PaginadorAlumno;
