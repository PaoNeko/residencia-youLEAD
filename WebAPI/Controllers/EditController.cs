using System.Threading.Tasks;
using Aplicacion.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [AllowAnonymous]
    public class EditController : MiControllerBase
    {
        [HttpPut]
        public async Task<ActionResult<IdentityUser>> Actualizar(EditarUsuario.Ejecuta parametros){
            return await Mediator.Send(parametros);
        }
    }
}