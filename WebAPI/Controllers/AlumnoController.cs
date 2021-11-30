using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aplicacion.Alumnos;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistencia.DapperConexion.Paginacion;

namespace WebAPI.Controllers
{
    public class AlumnoController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear (Nuevo.Ejecuta data){
            return await Mediator.Send(data);
        }

        [HttpGet]
        public async Task<ActionResult<List<AlumnoDtoA>>> Get(){
            return await Mediator.Send(new Consulta.ListaAlumnos());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlumnoDtoA>> Detalle (Int64 id){
            return await Mediator.Send(new ConsultaId.AlumnoUnico{Id = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar (Int64 id, Editar.Ejecuta data){
            data.AlumnoId = id;
            return await Mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar (Int64 id){
            return await Mediator.Send(new Eliminar.Ejecuta{Id = id});
        }
        
        //un post para pasar data de lo que se quiere ver
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionAlumno.Ejecuta data){
            return await Mediator.Send(data);
        }
    }
}