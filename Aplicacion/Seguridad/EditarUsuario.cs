using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Seguridad
{
    public class EditarUsuario
    {
        public class Ejecuta : IRequest<IdentityUser>{
            public string Email {get; set;}
            public string UserName {get; set;}
        }
        public class EjecutaValidador : AbstractValidator<Ejecuta>{
            public EjecutaValidador(){
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta, IdentityUser>
        {
            private readonly ControlContext _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IJwtGenerador _jwtGenerador;
            private readonly IPasswordHasher<Usuario> _passwordHasher;
            public Manejador (ControlContext contex, UserManager<Usuario> userManager, IJwtGenerador jwtGenerador,IPasswordHasher<Usuario> passwordHasher){
                _context = contex;
                _userManager = userManager;
                _jwtGenerador = jwtGenerador;
                _passwordHasher = passwordHasher;
            }
            public async Task<IdentityUser> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuarioIden = await _userManager.FindByEmailAsync(request.Email);
                if(usuarioIden == null){
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new {mensaje="No existe un usuario con este email"});
                }

                //usuarioIden.Email = request.Email;
                usuarioIden.UserName = request.UserName;

                var resultadoUpdate = await _userManager.UpdateAsync(usuarioIden);
                
                var resultadosRoles = await _userManager.GetRolesAsync(usuarioIden);
                var listRoles = new List<string>(resultadosRoles);

                if(resultadoUpdate.Succeeded){
                    return new IdentityUser{
                        UserName = usuarioIden.UserName,
                        Email = usuarioIden.Email
                    };
                }

                throw new System.Exception("No se pudo actualizar los datos");
            }
        }
    }
}

