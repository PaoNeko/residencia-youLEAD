using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Instructores

{
    public class Consulta
    {
        public class ListaInstructores : IRequest<List<InstructorDto>>{}
        public class Manejador : IRequestHandler<ListaInstructores, List<InstructorDto>>
        {
            private readonly ControlContext _context;
            private readonly IMapper _mapper;
            public Manejador(ControlContext context, IMapper mapper){
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<InstructorDto>> Handle(ListaInstructores request, CancellationToken cancellationToken)
            {
                var instructores = await _context.Instructor
                .Include(x=>x.AlumnoLista).ToListAsync();

                var instructoresDto =  _mapper.Map<List<InstructorDto>> (instructores);

                return instructoresDto;
            }
        }
    }
}