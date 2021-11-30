using System.IO;
using System.Threading.Tasks;
using Aplicacion.Alumnos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [AllowAnonymous]
    public class ExportarAlumnoDocumentoController : MiControllerBase
    {
        [HttpGet]
         public async Task<ActionResult<Stream>> GetTask(){
             return await Mediator.Send(new ExportPDFAlumn.Consulta());
         }
    }
}