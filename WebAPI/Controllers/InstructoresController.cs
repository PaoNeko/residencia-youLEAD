using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aplicacion.Instructores;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistencia.DapperConexion.Paginacion;

namespace WebAPI.Controllers
{
    //http://localhost:5000/api/Instructores
    [Route("api/[controller]")]
    [ApiController]
    public class InstructoresController : MiControllerBase
    {
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<InstructorDto>>> Get(){
            return await Mediator.Send(new Consulta.ListaInstructores());
        }

        //http://localhost:5000/api/Instructores/1
        [HttpGet("{id}")]
        public async Task<ActionResult<InstructorDto>> Detalle(Int64 id){
            return await Mediator.Send(new ConsultaId.InstructorUnico{Id=id});
        }
        // titnes k llamaer al instructor por id       (int id, ICollection<alumno> alumnos)
        //data = instrucotr entity(cl4se)(objeto instrucotr)
        //data.alumnoLista = alumnos

        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(Nuevo.Ejecuta data){
            return await Mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(Int64 id, Editar.Ejecuta data){
            data.InstructorId = id;
            return await Mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Int64 id){
            return await Mediator.Send(new Eliminar.Ejecuta{Id = id});
        }

        //un post para pasar data de lo que se quiere ver
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionInstructor.Ejecuta data){
            return await Mediator.Send(data);
        }

        [HttpGet("lista")]
        public async Task<ActionResult<List<InstructorDto>>> Lista(){
            return await Mediator.Send(new Consulta.ListaInstructores());
        }
    }
}