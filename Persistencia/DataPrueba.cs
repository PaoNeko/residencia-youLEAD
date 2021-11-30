using System.Linq;
using System.Threading.Tasks;
using Dominio;
using Microsoft.AspNetCore.Identity;

namespace Persistencia
{
    public class DataPrueba
    {
        public static async Task InsertarData(ControlContext context, UserManager<Usuario> usuarioManager, RoleManager<IdentityRole> roleManager){
            

            //Crear USUARIO
            if(!usuarioManager.Users.Any()){
                var usuarioPao = new Usuario{
                    NombreCompleto = "Dya Paola", 
                    UserName = "NekoPao", 
                    Email="pao_0498@hotmail.com"
                    
                };
                await usuarioManager.CreateAsync(usuarioPao, "Password123$");


                var usuarioTeacher = new Usuario{
                    NombreCompleto = "Carlos Aparicio", 
                    UserName = "TeacherMaster", 
                    Email="beingbetter_carlos@hotmail.com"
                };
                await usuarioManager.CreateAsync(usuarioTeacher, "Password1234$");

                var rol = new IdentityRole{
                    Name="Admi"
                };
                await roleManager.CreateAsync(rol);
                
                await usuarioManager.AddToRoleAsync(usuarioPao, rol.Name);
                await usuarioManager.AddToRoleAsync(usuarioTeacher, rol.Name);
            }   
            
                            
        }
    }
}