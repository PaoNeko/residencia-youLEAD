using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using AutoMapper;
using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Alumnos
{
    public class ConsultaId
    {
        public class AlumnoUnico : IRequest<AlumnoDtoA>{
            public Int64 Id {get; set;}
        }

        public class Manejador : IRequestHandler<AlumnoUnico, AlumnoDtoA>
        {
            private readonly ControlContext _context;
            private readonly IMapper _mapper;
            public Manejador(ControlContext context, IMapper mapper){
                _context = context;
                _mapper = mapper;
            }

            public async Task<AlumnoDtoA> Handle(AlumnoUnico request, CancellationToken cancellationToken)
            {
                var alumno = await _context.Alumno
                .Include(x => x.DatosCurso)
                .ThenInclude(y => y.Alumno).FirstOrDefaultAsync(a => a.AlumnoId == request.Id);
                
                if(alumno == null){
                    //throw new Exception ("No se puede eliminar curso");
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new {mensaje = "No se encontro el alumo"});
                }

                var alumnoDto = _mapper.Map<Alumno, AlumnoDtoA>(alumno);

                return alumnoDto;
            }
        }
    }
}