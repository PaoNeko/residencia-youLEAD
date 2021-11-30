using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;

namespace Aplicacion.Alumnos
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
                var datosDB = _context.DatosCurso.Where(x => x.AlumnoId == request.Id);
                foreach(var datos in datosDB){
                    _context.DatosCurso.Remove(datos);
                }
                
                var alumno = await _context.Alumno.FindAsync(request.Id);
                if(alumno==null){
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new {mensaje = "No se pudo eliminar el alumno"});
                }
                _context.Remove(alumno);

                var resultado = await _context.SaveChangesAsync();
                if(resultado>0){
                    return Unit.Value;
                }
                throw new Exception("No se pudieron guardar los cambios");
            }
        }
    }
}