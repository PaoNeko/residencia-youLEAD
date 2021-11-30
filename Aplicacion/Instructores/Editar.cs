using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;

namespace Aplicacion.Instructores
{
    public class Editar
    {
        public class Ejecuta : IRequest {
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
            public List<Int64> ListaAlumno {get; set;}
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>{
            public EjecutaValidacion(){
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Apellidos).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.TelefonoM).NotEmpty();
                RuleFor(x => x.CentroAprendizaje).NotEmpty();
                RuleFor(x => x.CantAlumnos).NotEmpty();
                RuleFor(x => x.Categoria).NotEmpty();
                RuleFor(x => x.UplineMaster).NotEmpty();
                RuleFor(x => x.ClaveInstructor).NotEmpty();
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
                var instructor = await _context.Instructor.FindAsync(request.InstructorId);
                 if(instructor == null){
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new {mensaje="No se encontro al instructor"});
                }

                instructor.Nombre = request.Nombre ?? instructor.Nombre;
                instructor.Apellidos = request.Apellidos ?? instructor.Apellidos;
                instructor.TelefonoM = request.TelefonoM ?? instructor.TelefonoM;
                instructor.Email = request.Email ?? instructor.Email;
                instructor.CentroAprendizaje = request.CentroAprendizaje ?? instructor.CentroAprendizaje;
                instructor.CantAlumnos = request.CantAlumnos ?? instructor.CantAlumnos;
                instructor.Categoria = request.Categoria ?? instructor.Categoria;
                instructor.UplineMaster = request.UplineMaster ?? instructor.UplineMaster;
                instructor.ClaveInstructor = request.ClaveInstructor ?? instructor.ClaveInstructor;
                instructor.ClaveUpline = request.ClaveUpline ?? instructor.ClaveUpline;

                if(request.ListaAlumno!= null){
                    if(request.ListaAlumno.Count>0){
                        //ELIMINAR los alunos actuales del curso en la base de datos
                        var alumnosBD = _context.Alumno.Where(x => x.InstructorId == request.InstructorId);
                        foreach(var alumnoEliminar in alumnosBD){
                            _context.Alumno.Remove(alumnoEliminar);
                        }
                        //FIN del procedimiento

                        //Procedimiento para agregar alumnos
                        foreach(var id in request.ListaAlumno){
                            var nuevoAlumno = new Alumno {
                                InstructorId = request.InstructorId,
                                AlumnoId = id
                            };
                            _context.Alumno.Add(nuevoAlumno);
                        }
                        //Fin del
                    }
                }

                var resultado = await _context.SaveChangesAsync();

                if(resultado>0)
                    return Unit.Value;

                throw new Exception("No se guardaron los cambios");
            }
        }
    }
}