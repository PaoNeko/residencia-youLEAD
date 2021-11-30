using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;

namespace Aplicacion.Alumnos
{

    public class Editar
    {
        public class Ejecuta : IRequest{
            public Int64 AlumnoId {get; set;}
            public string NombreAlumno {get; set;}
            public string ApellidosAlumno {get; set;}
            public DateTime? FechaNacimiento {get; set;}        
            public int? Edad {get; set;}
            public string Sexo {get; set;}
            public ulong? Telefono {get; set;}
            public string EmailAlumno {get; set;}
            public string EscuelaProcedencia {get; set;}
            public string GradoEstudio {get; set;}
            public Int64 InstructorId {get; set;}

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
        }
        public class EjecutaValida : AbstractValidator<Ejecuta> {
            public EjecutaValida(){
                RuleFor(x => x.NombreAlumno);
                RuleFor(x => x.ApellidosAlumno);
                RuleFor(x => x.FechaNacimiento);
                RuleFor(x => x.Edad);
                RuleFor(x => x.Sexo);
                RuleFor(x => x.Telefono);
                RuleFor(x => x.EmailAlumno);
                RuleFor(x => x.EscuelaProcedencia);
                RuleFor(x => x.GradoEstudio);
                RuleFor(x => x.InstructorId);
            }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly ControlContext _context;
            public Manejador(ControlContext context){
                _context = context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var alumno = await _context.Alumno.FindAsync(request.AlumnoId);
                if(alumno==null){
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new {mensaje = "No se encontro al alumno"});
                }

                alumno.NombreAlumno = request.NombreAlumno ?? request.NombreAlumno;
                alumno.ApellidosAlumno = request.ApellidosAlumno ?? request.ApellidosAlumno;
                alumno.FechaNacimiento = request.FechaNacimiento ?? request.FechaNacimiento;
                alumno.Edad = request.Edad ?? request.Edad;
                alumno.Sexo = request.Sexo ?? request.Sexo;
                alumno.Telefono = request.Telefono ?? request.Telefono;
                alumno.EmailAlumno = request.EmailAlumno ?? request.EmailAlumno;
                alumno.EscuelaProcedencia = request.EscuelaProcedencia ?? request.EscuelaProcedencia;
                alumno.GradoEstudio = request.GradoEstudio ?? request.GradoEstudio;
                //alumno.InstructorId = request.InstructorId ?? request.InstructorId;

                //Actualizar los datos del alumno
                var datosEntidad = _context.DatosCurso.Where(x => x.AlumnoId == alumno.AlumnoId).FirstOrDefault();
                if(datosEntidad!=null){
                    datosEntidad.ExamenValorativo = request.ExamenValorativo ?? request.ExamenValorativo;
                    datosEntidad.FechaExamen = request.FechaExamen ?? request.FechaExamen;
                    datosEntidad.LugarExamen = request.LugarExamen ?? request.LugarExamen;
                    datosEntidad.MetaInicio = request.MetaInicio ?? request.MetaInicio;
                    datosEntidad.CursoEspecial = request.CursoEspecial ?? request.CursoEspecial;
                    datosEntidad.NivelInscrito = request.NivelInscrito ?? request.NivelInscrito;
                    datosEntidad.Libro = request.Libro ?? request.Libro;
                    datosEntidad.FechaInscripcion = request.FechaInscripcion ?? request.FechaInscripcion;
                    datosEntidad.TipoPago = request.TipoPago ?? request.TipoPago;
                    datosEntidad.Precio = request.Precio ?? request.Precio; 
                }else{
                    datosEntidad = new DatosCurso{
                        //DatosCursoId = Guid.NewGuid(),
                        ExamenValorativo = request.ExamenValorativo ?? null,
                        FechaExamen = request.FechaExamen ?? null,
                        LugarExamen = request.LugarExamen ?? null,
                        MetaInicio = request.MetaInicio ?? null,
                        CursoEspecial = request.CursoEspecial ?? null,
                        NivelInscrito = request.NivelInscrito ?? null,
                        Libro = request.Libro ?? null,
                        FechaInscripcion = request.FechaInscripcion ?? null,
                        TipoPago = request.TipoPago ?? null,
                        Precio = request.Precio ?? null,
                        AlumnoId = alumno.AlumnoId
                    };
                    await _context.DatosCurso.AddAsync(datosEntidad);
                }

                var resultado = await _context.SaveChangesAsync();

                if(resultado>0){
                    return Unit.Value;
                }
                throw new Exception("No se guardaron los cambios del alumno");
            }
        }
    }
}