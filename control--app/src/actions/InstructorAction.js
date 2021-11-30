import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const guardarInstructor = async (instructor, imagen) => {
    const endPointInstructor = '/instructores';
    const promesaInstructor = HttpCliente.post(endPointInstructor, instructor);
    
    if(imagen){
        const endPointImagen = '/documento';    
        const promesaImagen = HttpCliente.post(endPointImagen, imagen);
        return await Promise.all([promesaInstructor, promesaImagen].map(p => p.catch(e => e)));
    }else{
        return await Promise.all([promesaInstructor].map(p => p.catch(e => e)));
    }
};

export const listInstructores = () => {
    const endPointUsuario= '/instructores/lista';
    return  new  Promise((resolve, eject) => {
        HttpCliente.get(endPointUsuario).then(response => {
            //console.log("listInstructores")
            resolve(response);
        })
    })
  };

export const paginacionInstructor = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/instructores/report', paginador).then(response => {
            resolve(response);
        })
    })
}

export const editarInstructor = async (instructor) => {
    const endPointAlumno= `/instructores/${instructor.InstructorId}`;
    const promesaAlumno = HttpCliente.put(endPointAlumno, instructor);
    return await Promise.all([promesaAlumno].map(p => p.catch(e => e)));
}

export const eliminarInstructor = async (instructor) => {
    const endPointAlumno= `/instructores/${instructor.instructorId}`;
    const promesaAlumno = HttpCliente.delete(endPointAlumno, instructor);
    return await Promise.all([promesaAlumno].map(p => p.catch(e => e)));
}

export const pdfInstructor = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post(window.open("http://localhost:5000/api/ExportarDocumento","_self"), paginador).then(response => {
            resolve(response);
        })
    })
}