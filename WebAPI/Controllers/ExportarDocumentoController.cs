using System.IO;
using System.Threading.Tasks;
using Aplicacion.Instructores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [AllowAnonymous]
    public class ExportarDocumentoController : MiControllerBase
    {
        [HttpGet]
         public async Task<ActionResult<Stream>> GetTask(){
             return await Mediator.Send(new ExportPDF.Consulta());
         }
    }
}