import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const guardarAlumno = async (alumno, imagen) => {
    const endPointAlumno= '/alumno';
    const promesaAlumno = HttpCliente.post(endPointAlumno, alumno);
    
    if(imagen){
        const endPointImagen = '/documento';   
        const promesaImagen = HttpCliente.post(endPointImagen, imagen);
        return await Promise.all([promesaAlumno, promesaImagen].map(p => p.catch(e => e)));
    }else{
        return await Promise.all([promesaAlumno].map(p => p.catch(e => e)));
    }
};

export const listAlumnos = () => {
  const endPointAlumno= '/alumno';
  return  new  Promise((resolve, eject) => {
      HttpCliente.get(endPointAlumno).then(response => {
          resolve(response);
      })
  })
}

export const paginacionAlumno = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/alumno/report', paginador).then(response => {
            resolve(response);
        })
    })
}

export const editarAlumno = async (alumno) => {
    const endPointAlumno= `/Alumno/${alumno.AlumnoId}`;
    const promesaAlumno = HttpCliente.put(endPointAlumno, alumno);
    return await Promise.all([promesaAlumno].map(p => p.catch(e => e)));
}



export const editarAlumnoo = (alumno) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put(`/alumno/${alumno.alumnoId}`,alumno)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response);
        })
    })
}

export const eliminarAlumno = async (alumno) => {
    const endPointAlumno= `/Alumno/${alumno.AlumnoId}`;
    const promesaAlumno = HttpCliente.delete(endPointAlumno, alumno);
    return await Promise.all([promesaAlumno].map(p => p.catch(e => e)));
}

export const pdfAlumno = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get(window.open("http://localhost:5000/api/ExportarAlumnoDocumento","_self"), paginador).then(response => {
            resolve(response);
        })
    })
}