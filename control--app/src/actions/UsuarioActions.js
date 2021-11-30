import HttpCliente from "../servicios/HttpCliente";
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    instancia.post("/usuario/registrar", usuario).then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.log('error al registrar', error);
      
      resolve(error);
    });
  });
};

export const obtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, eject) => {
    instancia.get("/usuario")
      .then((response) => {
        
        console.log('response',response);
        if(response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        console.log('error actualizar', error);
        
        resolve(error);
      });
  });
};

export const actualizarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia.put('/Usuario', usuario)
      .then(response => {
        
          if(response.data && response.data.imagenPerfil){
            let fotoPerfil = response.data.imagenPerfil;
            const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
            response.data.imagenPerfil = nuevoFile;
          }

          dispatch({
            type : 'INICIAR_SESION',
            sesion : response.data,
            autenticado : true,
          });
          
          resolve(response);

      })
      .catch(error => {
        resolve(error.response);
      })
  });
};

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia.post("/usuario/login", usuario).then(response => {
      if(response.data && response.data.imagenPerfil) {
        let fotoPerfil = response.data.imagenPerfil;
        const nuevoFile = "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
        response.data.imagenPerfil = nuevoFile;
      }
      
      dispatch({
        type : "INICIAR_SESION",
        sesion : response.data,
        autenticado : true
      })
      
      resolve(response);
    }).catch(error => {
        resolve(error.response);
    });
  });
};

export const guardarUsuario = async (usuario) => {
  const endPointInstructor = '/usuario/registrar';
  const promesaInstructor = instancia.post(endPointInstructor, usuario);
  return await Promise.all([promesaInstructor].map(p => p.catch(e => e)));
};

export const listUsuarios = () => {
  const endPointUsuario= '/usuario/lista';
  return  new  Promise((resolve, eject) => {
      HttpCliente.get(endPointUsuario).then(response => {
          resolve(response);
      })
  })
};

export const editarUser = async (usuario) => {
  const endPointUsuario = '/edit';
  const promesaUsuario = instancia.put(endPointUsuario, usuario);
  return await Promise.all([promesaUsuario].map(p => p.catch(e => e)));
};

export const eliminarUsuario = async (usuario) => {
  const endPointAlumno= `/usuario/${usuario.id}`;
  const promesaAlumno = HttpCliente.delete(endPointAlumno, usuario);
  return await Promise.all([promesaAlumno].map(p => p.catch(e => e)));
}