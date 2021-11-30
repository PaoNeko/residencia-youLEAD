using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;

namespace Aplicacion.Instructores
{
    public class Nuevo
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
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.TelefonoM).NotEmpty();
                RuleFor(x => x.CantAlumnos).NotEmpty();
                RuleFor(x => x.Categoria).NotEmpty();
                RuleFor(x => x.UplineMaster).NotEmpty();
                RuleFor(x => x.ClaveInstructor).NotEmpty();
                RuleFor(x => x.ClaveUpline).NotEmpty();
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
                /*Guid _instructorId = Guid.NewGuid();

                if(request.InstructorId != null){
                    _instructorId = request.InstructorId ?? Guid.NewGuid();
                }*/

                var instructor = new Instructor{
                    //InstructorId = _instructorId,
                    Nombre = request.Nombre,
                    Apellidos = request.Apellidos,
                    TelefonoM = request.TelefonoM,
                    Email = request.Email,
                    CentroAprendizaje = request.CentroAprendizaje,
                    CantAlumnos = request.CantAlumnos,
                    Categoria = request.Categoria,
                    UplineMaster = request.UplineMaster,
                    ClaveInstructor = request.ClaveInstructor,
                    ClaveUpline = request.ClaveUpline
                };

                _context.Instructor.Add(instructor);

                //agregue esto para que mostrara la lista de alumnos 
                //(en el video tiene una tabla CursoInstructor que es para relacionar a Curso y a Instructor)
                if(request.ListaAlumno!=null){
                    foreach(var id in request.ListaAlumno){
                        var alumno = new Alumno{
                            //InstructorId = _instructorId,
                            AlumnoId = id
                        };
                        _context.Alumno.Add(alumno);
                    }
                }

                var valor = await _context.SaveChangesAsync();
                if(valor>0){
                    return Unit.Value;
                }

                throw new Exception("No se inserto al nuevo instructor");
            }
        }
    }
}