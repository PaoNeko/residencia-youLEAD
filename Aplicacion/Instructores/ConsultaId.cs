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

namespace Aplicacion.Instructores
{
    public class ConsultaId
    {
        public class InstructorUnico : IRequest<InstructorDto>{
            public Int64 Id {get; set;}
        }

        public class Manejador : IRequestHandler<InstructorUnico, InstructorDto>
        {
            private readonly ControlContext _context;
            private readonly IMapper _mapper;
            public Manejador(ControlContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<InstructorDto> Handle(InstructorUnico request, CancellationToken cancellationToken)
            {
                var instructor = await _context.Instructor
                .Include(x => x.AlumnoLista).FirstOrDefaultAsync(a => a.InstructorId == request.Id);

                if(instructor == null){
                    //throw new Exception("No se pudo eliminar el instructor");
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new { mensaje = "No se encontro al instructor" });
                }

                var instructorDto = _mapper.Map<Instructor,InstructorDto>(instructor) ;
                return instructorDto;
            }
        }
    }
}