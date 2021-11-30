using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;

namespace Aplicacion.Instructores
{
    public class Eliminar
    {
        public class Ejecuta : IRequest {
            public Int64 Id {get; set;}
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly ControlContext _context;
            public Manejador(ControlContext context){
                _context = context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                //Eliminar a todos los alumnos que le pertenecen al instructor
                /*var alumnosDB = _context.Alumno.Where(x => x.InstructorId == request.Id);
                foreach(var almn in alumnosDB){
                    _context.Alumno.Remove(almn);
                }*/

                var instructor = await _context.Instructor.FindAsync(request.Id);
                if(instructor == null){
                    //throw new Exception("No se pudo eliminar el instructor");
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new {mensaje="No se encontro al instructor"});
                }
                _context.Remove(instructor);

                var reultado = await _context.SaveChangesAsync();

                if(reultado>0){
                    return Unit.Value;
                }
                throw new Exception("No se guardaron los cambios");
            }
        }
    }
}