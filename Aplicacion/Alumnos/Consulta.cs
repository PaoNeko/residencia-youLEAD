using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Alumnos
{
    public class Consulta
    {
        public class ListaAlumnos : IRequest<List<AlumnoDtoA>>{}

        public class Manejador : IRequestHandler<ListaAlumnos, List<AlumnoDtoA>>
        {
            private readonly ControlContext _context;
            private readonly IMapper _mapper;
            public Manejador(ControlContext context, IMapper mapper){
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<AlumnoDtoA>> Handle(ListaAlumnos request, CancellationToken cancellationToken)
            {
                var alumnos = await _context.Alumno
                .Include(x => x.DatosCurso)
                .ThenInclude(x => x.Alumno).ToListAsync();

                var alumnosDto = _mapper.Map<List<AlumnoDtoA>>(alumnos);
                
                return alumnosDto;
            }
        }
    }
}