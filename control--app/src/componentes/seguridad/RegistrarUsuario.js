import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import style from "../Tool/Style";
import {
  guardarUsuario,
  listUsuarios,
  registrarUsuario,
  editarUser,
  eliminarUsuario,
} from "../../actions/UsuarioActions";
import { useStateValue } from "../../contexto/store";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © YouLEAD  "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

var list = [];

const RegistrarUsuario = () => {
  const classes = useStyles();

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuarioResponse, setUsuarioResponse] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenerListaUsuarios = async () => {
      const usuarios = await listUsuarios();
      console.log("usuarios");
      console.log(usuarios.data);
      setUsuarioResponse(usuarios.data);
      //alumnosResponse.push(alumnos.data)
      list = usuarios.data;
      list.map((datos) => console.log(datos.userName));
      //console.log('nya'+ list)
    };

    return obtenerListaUsuarios();
  }, []);

  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    //ConfirmaPassword : '',
    userName: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const resetearForm = () => {
    setUsuario({
      nombreCompleto: "",
      email: "",
      password: "",
      //ConfirmaPassword : '',
      userName: "",
    });
  };

  const guardarUsuarioBoton = (e) => {
    e.preventDefault();
    guardarUsuario(usuario).then((respuestas) => {
      const responseUsuario = respuestas[0];
      let mensaje = "";
      if (responseUsuario.status === 200) {
        mensaje += "Se guardo exitosamente el nuevo usuario";
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
  };

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: "",
    email: "",
    UserName: "",
  });

  const resetearForm1 = () => {
    setUsuario({
      email: "",
      UserName: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const seleccionarPais = (user, caso) => {
    setUsuarioSeleccionado(user);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const editUsuario = (e) => {
    editarUser(usuarioSeleccionado).then((respuestas) => {
      const responseUsuarioo = respuestas[0];
      let mensaje = "";
      if (responseUsuarioo.status === 200) {
        mensaje += "Se actualizo exitosamente";
        resetearForm1();
      }
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: mensaje,
        },
      });
    });
    setModalEditar(false);
  };

  

  const eliminar = () => {
    eliminarUsuario(usuarioSeleccionado).then((respuestas) => {
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
    <div style={style.paper} className="container">
      <Card className={classes.root} style={{ background: "#009900" }}>
        <CardContent>
          <div style={style.paper} className="container">
            <h1>Usuarios</h1>
            <div className="flex-row">
              <div className="flex-large">
                <h2>Add user</h2>
                <div style={style.paper}>
                  <form style={style.form}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          name="nombreCompleto"
                          value={usuario.nombreCompleto}
                          onChange={ingresarValoresMemoria}
                          variant="outlined"
                          fullWidth
                          label="Nombre y apellidos"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="email"
                          value={usuario.email}
                          onChange={ingresarValoresMemoria}
                          variant="outlined"
                          fullWidth
                          label="Email"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="userName"
                          value={usuario.userName}
                          onChange={ingresarValoresMemoria}
                          variant="outlined"
                          fullWidth
                          label="UserName"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="password"
                          value={usuario.password}
                          onChange={ingresarValoresMemoria}
                          type="password"
                          variant="outlined"
                          fullWidth
                          label="Registre una contraseña"
                        />
                      </Grid>
                    </Grid>

                    <Grid container justify="center">
                      <Grid item xs={12} md={6}>
                        <Box mt={8}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                            style={style.submit}
                            onClick={guardarUsuarioBoton}
                          >
                            Guardar Usuario
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </div>

              <Box mt={10}>
                <div className="flex-large">
                  <h2>View users</h2>
                  <div align="center">
                    <div className="row">
                      <div className="col-md-12">
                        <table className="table table-responsive text-center text-white">
                          <thead style={{ background: "#009900" }}>
                            <tr>
                              <th scope="col"> ID </th>
                              <th scope="col"> UserName </th>
                              <th scope="col"> Email</th>
                              <th scope="col"> Editar</th>
                              <th scope="col"> Eliminar</th>
                            </tr>
                          </thead>

                          <tbody>
                            {list.map((user) => (
                              <tr class="text-left text-dark" key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      seleccionarPais(user, "Editar")
                                    }
                                  >
                                    Editar
                                  </button>
                                </td>
                                {"   "}
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      seleccionarPais(user, "Eliminar")
                                    }
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </div>

            <Box mt={10}>
              <Copyright />
            </Box>

            <Modal isOpen={modalEditar}>
              <ModalHeader background="#388e3c">
                <div>
                  <h3>Editar Usuario</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label>ID</label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    name="id"
                    value={usuarioSeleccionado && usuarioSeleccionado.id}
                  />
                  <br />

                  <label>Email</label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    name="email"
                    value={usuarioSeleccionado && usuarioSeleccionado.email}
                    onChange={handleChange}
                  />
                  <br />

                  <label>UserName</label>
                  <input
                    className="form-control"
                    type="text"
                    name="UserName"
                    value={usuarioSeleccionado && usuarioSeleccionado.UserName}
                    onChange={handleChange}
                  />
                  <br />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-primary"
                  onClick={() => editUsuario()}
                >
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
                Estás Seguro que deseas eliminar el Usuario{" "}
                {usuarioSeleccionado && usuarioSeleccionado.userName}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrarUsuario;
