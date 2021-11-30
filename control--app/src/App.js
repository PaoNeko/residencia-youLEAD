import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider as MuithemeProvider} from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Grid, Snackbar } from '@material-ui/core';
import AppNavbar from './componentes/navegacion/AppNavbar';
import { useStateValue } from './contexto/store';
import { obtenerUsuarioActual } from './actions/UsuarioActions';
import RutaSegura from './componentes/navegacion/RutaSegura';
import NuevoInstructor from './componentes/instructores/NuevoInstructor';
import PaginadorInstructor from './componentes/instructores/PaginadorInstructor';
import PaginadorAlumno from './componentes/alumnos/PaginadorAlumno';
import NuevoAlumno from './componentes/alumnos/NuevoAlumno';
import SignInSide from './componentes/seguridad/LoginNya';
import Home from './componentes/seguridad/Home';
import PaginadorLista from './componentes/alumnos/PaginadorLista';
import LoginNya from './componentes/seguridad/LoginNya';

function App() {
  const [{sesionUsuario, openSnackbar }, dispatch] = useStateValue();

  const [{iniciaApp}, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        }
      ></Snackbar>
      <Router>
        <MuithemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>

            <Route exact path="/auth/login" component={SignInSide} />
              <Route
                exact
                path="/auth/registrar"
                component={RegistrarUsuario}
              />
              
              <RutaSegura 
                exact
                path = "/auth/perfil"
                component = {PerfilUsuario}
              />
              
              <RutaSegura 
                exact
                path="/"
                component={PerfilUsuario}
              />

              <Route 
                exact
                path="/Home"
                component={Home}
              />

              <Route
                exact
                path="/instructor/nuevo"
                component={NuevoInstructor}
              />

              <Route
                exact
                path="/instructor/paginador"
                component={PaginadorInstructor}
              />

              <Route
                exact
                path="/alumno/nuevo"
                component={NuevoAlumno}
              />

              <Route
                exact
                path="/alumno/paginador"
                component={PaginadorAlumno}
              />

              <Route
                exact
                path="/alumno/listaAlumno"
                component={PaginadorLista}
              />

            </Switch>
          </Grid>
        </MuithemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
