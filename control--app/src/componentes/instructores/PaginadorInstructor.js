import React, { useState, useEffect } from "react";
import {
  paginacionInstructor,
  editarInstructor,
  eliminarInstructor,
  pdfInstructor,
  listInstructores,
} from "../../actions/InstructorAction";
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
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useStateValue } from "../../contexto/store";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import { ExportToExcel } from "./ExportToExcel";
var list = [];
var lista = [];

const PaginadorInstructor = () => {
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
  const fileName = "ListaInstructores";

  /*const [usuarioResponse, setUsuarioResponse] = useState();
  useEffect(()=> {
    const obtenerListaUsuarios = async() => {
        const usuarios = await listInstructores();
        console.log('---------------------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------------------');
       // console.log(usuarios.data.map(i => i.alumnos));
        console.log('---------------------------------------------------------------------------------');
        setUsuarioResponse(usuarios.data);
        //alumnosResponse.push(alumnos.data)
        lista = usuarios.data.map(i =>i.alumnos);
        console.log(lista.map(alumno => alumno))
        console.log('---------------------------------------------------------------------------------');
        //lista.map(datos => console.log( datos) )
        
        
    }
    
    return obtenerListaUsuarios();
},[])*/

  const [textoBusquedaInstructor, setTextoBusquedaInstructor] = useState("");
  const typingBuscadorTexto = ControlTyping(textoBusquedaInstructor, 900);

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

      const response = await paginacionInstructor(objetoPaginadorRequest);
      const listaNueva = await listInstructores();

      console.log(response.data);
      console.log(
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      );
      response.data.listaRecords.map((i) => {
        i.alumnos =[]
        return i;
      });
      response.data.listaRecords = listaNueva.data
      console.log(response.data.listaRecords);
      console.log(
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      );
      console.log(listaNueva.data);
      setPaginadorResponse(response.data);
    };

    obtenerListaInstructor();
  }, [paginadorRequest, typingBuscadorTexto]);

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
  const [modalLista, setModalLista] = useState(false);

  const [instructorSeleccionado, setInstructorSeleccionado] = useState({
    InstructorId: "",
    Nombre: "",
    Apellidos: "",
    Email: "",
    TelefonoM: "",
    CentroAprendizaje: "",
    CantAlumnos: 0,
    Categoria: "",
    UplineMaster: "",
    ClaveInstructor: "",
    ClaveUpline: "",
    alumnos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorSeleccionado((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const seleccionarInstructor = (instructor, caso) => {
    setInstructorSeleccionado(instructor);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const selectInstructor = (instructor, caso1) => {
    setInstructorSeleccionado(instructor);
    console.log("*************************************************");    
    lista = instructor.alumnos
    console.log(lista);
    console.log("*************************************************");
    setInstructorSeleccionado(instructor);

    caso1 === "Lista" ? setModalLista(true) : setModalLista(true);
  };

  const editInstructor = () => {
    instructorSeleccionado.CantAlumnos = +instructorSeleccionado.CantAlumnos;
    instructorSeleccionado.TelefonoM = +instructorSeleccionado.TelefonoM;
    editarInstructor(instructorSeleccionado).then((respuestas) => {
      const responseAlumno = respuestas[0];

      let mensaje = "";
      if (responseAlumno.status === 200) {
        mensaje += "Se actualizo exitosamente!!";
        setModalEditar(false);
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
    eliminarInstructor(instructorSeleccionado).then((respuestas) => {
      const responseAlumno = respuestas[0];
      let mensaje = "";
      if (responseAlumno.status === 200) {
        mensaje += "Se elimino exitosamente";
      }else {
        mensaje +=
          "Error: No se pudo eliminar" 
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
        <h2>Lista de Instructores</h2>
      </div>
      <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid item xs={12} sm={4} md={24}>
          <TextField
            fullWidth
            name="textoBusquedaInstructor"
            variant="outlined"
            label="Buscar instructor"
            onChange={(e) => setTextoBusquedaInstructor(e.target.value)}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">InstructorID</StyledTableCell>
              <StyledTableCell align="left">Instructores</StyledTableCell>
              <Hidden mdDown>
                <StyledTableCell align="left">Apellidos</StyledTableCell>
                <StyledTableCell align="left">Telefono</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">
                  Centro Aprendizaje
                </StyledTableCell>
                <StyledTableCell align="left">Cantidad Alumnos</StyledTableCell>
                <StyledTableCell align="left">Categoria</StyledTableCell>
                <StyledTableCell align="left">Clave Instructor</StyledTableCell>
                <StyledTableCell align="left">Upline Master</StyledTableCell>
                <StyledTableCell align="left">Clave Upline</StyledTableCell>
                <StyledTableCell align="left">Ver</StyledTableCell>
                <StyledTableCell align="left">Editar</StyledTableCell>
                <StyledTableCell align="left">Eliminar</StyledTableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginadorResponse.listaRecords.map((instructor) => (
              <TableRow key={(instructor.nombre, instructor.instructorId)}>
                <TableCell align="left">{instructor.instructorId}</TableCell>
                <TableCell align="left">{instructor.nombre}</TableCell>

                <Hidden mdDown>
                  <TableCell align="left">{instructor.apellidos}</TableCell>
                  <TableCell align="left">{instructor.telefonoM}</TableCell>
                  <TableCell align="left">{instructor.email}</TableCell>
                  <TableCell align="left">{instructor.centroAprendizaje}</TableCell>
                  <TableCell align="left">{instructor.cantAlumnos}</TableCell>
                  <TableCell align="left">{instructor.categoria}</TableCell>
                  <TableCell align="left">{instructor.claveInstructor}</TableCell>
                  <TableCell align="left">{instructor.uplineMaster}</TableCell>
                  <TableCell align="left">{instructor.claveUpline}</TableCell>
                  <TableCell align="left">
                    <td>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => selectInstructor(instructor, "Lista")}
                      >
                        <ListIcon className={classes.extendedIcon} />
                      </button>
                    </td>
                  </TableCell>
                  <TableCell align="left">
                    <td>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          seleccionarInstructor(instructor, "Editar")
                        }
                      >
                        <EditIcon className={classes.extendedIcon} />
                      </button>
                    </td>
                  </TableCell>
                  <TableCell align="left">
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          seleccionarInstructor(instructor, "Eliminar")
                        }
                      >
                        <DeleteIcon className={classes.extendedIcon} />
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
        rowsPerPageOptions={[2, 4, 6]}
        count={paginadorResponse.totalRecords}
        rowsPerPage={paginadorRequest.cantidadElementos}
        page={paginadorRequest.numeroPagina}
        onChangePage={cambiarPagina}
        onChangeRowsPerPage={cambiarCantidadRecords}
        labelRowsPerPage="Instructores por pagina"
      />

      <div style={style.paper}>
        <form style={style.form}></form>
        <Fab
          style={style.submit}
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={pdfInstructor}
        >
          <GetAppIcon className={classes.extendedIcon} />
          EXPORT PDF
        </Fab>

        <div className="App">
          <ExportToExcel apiData={list} fileName={fileName} />
        </div>
      </div>

      <Modal isOpen={modalEditar}>
        <ModalHeader color="#388e3c">
          <div>
            <h3>Editar Instructor</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              //readOnly
              type="text"
              name="instructorId"
              value={
                instructorSeleccionado && instructorSeleccionado.instructorId
              }
              //onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={instructorSeleccionado && instructorSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellidos</label>
            <input
              className="form-control"
              type="text"
              name="apellidos"
              value={instructorSeleccionado && instructorSeleccionado.apellidos}
              onChange={handleChange}
            />
            <br />

            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={instructorSeleccionado && instructorSeleccionado.email}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefonoM"
              value={instructorSeleccionado && instructorSeleccionado.telefonoM}
              onChange={handleChange}
            />
            <br />

            <label>CentroAprendizaje</label>
            <input
              className="form-control"
              type="text"
              name="centroAprendizaje"
              value={
                instructorSeleccionado && instructorSeleccionado.centroAprendizaje
              }
              onChange={handleChange}
            />
            <br />

            <label>CantAlumnos</label>
            <input
              className="form-control"
              type="text"
              name="cantAlumnos"
              value={
                instructorSeleccionado && instructorSeleccionado.cantAlumnos
              }
              onChange={handleChange}
            />
            <br />

            <label>Categoria</label>
            <input
              className="form-control"
              type="text"
              name="categoria"
              value={instructorSeleccionado && instructorSeleccionado.categoria}
              onChange={handleChange}
            />
            <br />

            <label>Upline Master</label>
            <input
              className="form-control"
              type="text"
              name="uplineMaster"
              value={
                instructorSeleccionado && instructorSeleccionado.uplineMaster
              }
              onChange={handleChange}
            />
            <br />

            <label>ClaveInstructor</label>
            <input
              className="form-control"
              type="text"
              name="claveInstructor"
              value={
                instructorSeleccionado && instructorSeleccionado.claveInstructor
              }
              onChange={handleChange}
            />
            <br />

            <label>ClaveUpline</label>
            <input
              className="form-control"
              type="text"
              name="claveUpline"
              value={
                instructorSeleccionado && instructorSeleccionado.claveUpline
              }
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editInstructor()}>
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

      <Modal isOpen={modalLista} style={{ width: "100%" }}>
        <ModalHeader color="#388e3c">
          <div>
            <h3>Lista Instructor - Alumno</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID Instructor</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="instructorId"
              value={
                instructorSeleccionado && instructorSeleccionado.instructorId
              }
              //onChange={handleChange}
            />
            <br />

            <label>Nombre Instructor</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={instructorSeleccionado && instructorSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">AlumnoID</StyledTableCell>
                <StyledTableCell align="left">Nombre Alumno</StyledTableCell>
                <StyledTableCell align="left">Escuela Procedencia</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {lista.map(alumno => (
                <TableRow >
                <TableCell align="left">{alumno.alumnoId}</TableCell>
                <TableCell align="left">{alumno.nombreAlumno}</TableCell>
                <TableCell align="left">{alumno.escuelaProcedencia}</TableCell>
            </TableRow>
              ))  }
            </TableBody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => setModalLista(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el Instructor{" "}
          {instructorSeleccionado && instructorSeleccionado.Nombre}
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

export default PaginadorInstructor;
