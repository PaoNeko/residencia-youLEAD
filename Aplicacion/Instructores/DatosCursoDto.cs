using System;

namespace Aplicacion.Instructores
{
    public class DatosCursoDto
    {
        public Int64 DatosCursoId {get; set;}
        public string ExamenValorativo {get; set;}
        public DateTime? FechaExamen {get; set;}
        public string LugarExamen {get; set;}
        public int? MetaInicio {get; set;}
        public string CursoEspecial {get; set;}
        public string NivelInscrito {get; set;}
        public int? Libro {get; set;}
        public DateTime? FechaInscripcion {get; set;}
        public string TipoPago {get; set;}
        public int? Precio {get; set;}
        public Int64 AlumnoId {get; set;}

    }
}