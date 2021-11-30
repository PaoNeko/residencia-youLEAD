using Dominio;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistencia
{
    public class ControlContext : IdentityDbContext<Usuario>
    {
        public ControlContext(DbContextOptions options) : base(options){ //metodo para migraciones y puente

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){ //entidad CursoInstructor clave primaria compuesta... osea dos llaves prmarias - relacion muchos a muchos
            base.OnModelCreating(modelBuilder);
        }
        
        //conversion a entidades de las clases de dominio
        public DbSet<Alumno> Alumno {get; set;}
        public DbSet<Instructor> Instructor {get; set;}
        public DbSet<DatosCurso> DatosCurso {get; set;}
        public DbSet<Documento> Documento {get;set;}
        public DbSet<UsersAll> UsersAll {get;set;}
    }
}