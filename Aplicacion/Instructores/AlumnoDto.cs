using System;

namespace Aplicacion.Instructores
{
    public class AlumnoDto
    {
        public Int64 AlumnoId {get; set;}
        public string NombreAlumno {get; set;}
        public string ApellidosAlumno {get; set;}
        public DateTime? FechaNacimiento {get; set;}
        public int Edad {get; set;}
        public string Sexo {get; set;}
        public ulong? Telefono {get; set;}
        public string EmailAlumno {get; set;}
        public string EscuelaProcedencia {get; set;}
        public string GradoEstudio {get; set;}
        public Int64 InstructorId {get; set;}
        public DatosCursoDto Datos {get; set;}
    }
}