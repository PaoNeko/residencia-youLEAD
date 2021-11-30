using System;
using System.Threading;
using System.Threading.Tasks;
using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;

namespace Aplicacion.Alumnos
{
    public class Nuevo
    {
        public class Ejecuta : IRequest { 
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

            public string ExamenValorativo {get; set;}
            public DateTime? FechaExamen {get; set;}
            public string LugarExamen {get; set;}
            public int MetaInicio {get; set;}
            public string CursoEspecial {get; set;}
            public string NivelInscrito {get; set;}
            public int Libro {get; set;}
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
            private readonly ControlContext _context ;
            public Manejador(ControlContext context){
                _context = context;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                /*Guid _alumnoId = Guid.NewGuid();

                if(request.AlumnoId != null){
                    _alumnoId = request.AlumnoId ?? Guid.NewGuid();
                }*/
                
                //Agregar logica para insertar los datos del alumno
                var datosEntidad = new DatosCurso{
                    //AlumnoId = _alumnoId,
                    ExamenValorativo = request.ExamenValorativo,
                    FechaExamen = request.FechaExamen,
                    LugarExamen = request.LugarExamen,
                    MetaInicio = request.MetaInicio,
                    CursoEspecial = request.CursoEspecial,
                    NivelInscrito = request.NivelInscrito,
                    Libro = request.Libro,
                    FechaInscripcion = request.FechaInscripcion,
                    TipoPago = request.TipoPago,
                    Precio = request.Precio,
                    //DatosCursoId = Guid.NewGuid()
                };

                var alumno = new Alumno{
                    //AlumnoId = _alumnoId,
                    NombreAlumno = request.NombreAlumno,
                    ApellidosAlumno = request.ApellidosAlumno,
                    FechaNacimiento = request.FechaNacimiento,
                    Edad = request.Edad,
                    Sexo = request.Sexo,
                    Telefono = request.Telefono,
                    EmailAlumno = request.EmailAlumno,
                    EscuelaProcedencia = request.EscuelaProcedencia,
                    GradoEstudio = request.GradoEstudio,
                    InstructorId = request.InstructorId,
                    DatosCurso = datosEntidad
                };
                _context.Alumno.Add(alumno);

                var resultado = await _context.SaveChangesAsync();
                if(resultado > 0){
                    return Unit.Value;
                }
                throw new Exception("No se pudo insertar los datos");
            }
        }
    }
}