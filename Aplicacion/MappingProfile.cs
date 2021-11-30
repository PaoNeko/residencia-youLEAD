using System.Linq;
using Aplicacion.Alumnos;
using Aplicacion.Instructores;
using AutoMapper;
using Dominio;

namespace Aplicacion
{
    public class MappingProfile : Profile
    {
        public MappingProfile(){
            CreateMap<Instructor, InstructorDto>()
            .ForMember(x => x.Alumnos, y => y.MapFrom(z => z.AlumnoLista));
            CreateMap<Alumno, AlumnoDto>();

            CreateMap<Alumno, AlumnoDtoA>()
            .ForMember(x => x.Datos, y => y.MapFrom(z => z.DatosCurso));
            CreateMap<DatosCurso, DatosCursoDtoA>();
        }
    }
}