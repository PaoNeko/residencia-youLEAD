using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Persistencia;

namespace WebAPI.Controllers
{
    //http://localhost:5000/WeatherForecast

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        //injeccion de dependencias
        private readonly ControlContext context;
        public WeatherForecastController(ControlContext _context){
            this.context = _context;
        }

        [HttpGet]
        public IEnumerable<Instructor> Get(){
            return context.Instructor.ToList();
        }
    }
}
