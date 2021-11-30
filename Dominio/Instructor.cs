using System.Collections.Generic;
using System;

namespace Dominio
{
    public class Instructor
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
        public ICollection<Alumno> AlumnoLista {get; set;}
    }
}