using System;
using System.Collections;
using System.Collections.Generic;

namespace Aplicacion.Instructores
{
    public class InstructorDto
    {
        public Int64 InstructorId {get; set;}
        public string Nombre {get; set;}
        public string Apellidos {get; set;}
        public ulong? TelefonoM {get; set;}
        public string Email {get; set;}
        public string CentroAprendizaje {get; set;}
        public int? CantAlumnos {get; set;}
        public string Categoria {get; set;}
        public string UplineMaster {get; set;}
        public string ClaveInstructor {get; set;}
        public string ClaveUpline {get; set;}
        public ICollection<AlumnoDto> Alumnos {get; set;}
    }
}