using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Seguridad
{
    public class UsuarioConsulta
    {
        public class ListaUsuarios : IRequest<List<IdentityUser>>{}

        public class Manejador : IRequestHandler<ListaUsuarios, List<IdentityUser>>
        {
            private readonly ControlContext _context;
            private readonly IMapper _mapper;
            public Manejador(ControlContext context, IMapper mapper){
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<IdentityUser>> Handle(ListaUsuarios request, CancellationToken cancellationToken)
            {
                var usuarios = await _context.Users.ToListAsync();

                var usuariosAll = _mapper.Map<List<IdentityUser>>(usuarios);
                
                return usuariosAll;
            }
        }
    }
}