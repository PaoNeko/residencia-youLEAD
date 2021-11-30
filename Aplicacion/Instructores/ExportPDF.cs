using System.IO;
using System.Threading;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Instructores
{
    public class ExportPDF
    {
      
        public class Consulta : IRequest<Stream> {}

        public class Manejador : IRequestHandler<Consulta, Stream>
        {

            private readonly ControlContext _context;
            
            public Manejador(ControlContext context){
                _context= context;
            }
            public async Task<Stream> Handle(Consulta request, CancellationToken cancellationToken)
            {
                Font fuenteTitulo = new Font(Font.HELVETICA, 11f, Font.BOLD,BaseColor.Blue );
                Font fuenteHeader = new Font(Font.HELVETICA, 8f, Font.BOLD, BaseColor.Black);
                Font fuenteData = new Font(Font.HELVETICA, 7f, Font.NORMAL, BaseColor.Black);                

                var instructores = await _context.Instructor.ToListAsync();

                MemoryStream workStream = new MemoryStream();
                Rectangle rect = new Rectangle(PageSize.A4);

                Document document = new Document(rect, 40, 40, 50, 100);
                PdfWriter writer = PdfWriter.GetInstance(document, workStream);
                writer.CloseStream = false;

                document.Open();
                document.AddTitle("Lista de Instructores de YouLEAD");
                
                PdfPTable tabla = new PdfPTable(1);
                tabla.WidthPercentage = 90;
                PdfPCell celda = new PdfPCell(new Phrase("Lista de Instructores de YOULEAD", fuenteTitulo )) ;
                celda.Border = Rectangle.NO_BORDER;
                tabla.AddCell(celda);
                document.Add(tabla);

                PdfPTable tabla1 = new PdfPTable(1);
                tabla1.WidthPercentage = 90;
                PdfPCell celda1 = new PdfPCell(new Phrase(" ", fuenteTitulo )) ;
                celda1.Border = Rectangle.NO_BORDER;
                tabla1.AddCell(celda1);
                document.Add(tabla1);

                PdfPTable tablaInstructores = new PdfPTable(9);
                float[] widths = new float[]{15f, 40f, 40f, 40f, 50f, 50f, 40f, 40f, 40f};
                tablaInstructores.SetWidthPercentage(widths, rect);

                PdfPCell celdaHeaderInstructorId = new PdfPCell(new Phrase("ID", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderInstructorId);

                PdfPCell celdaHeaderNombre = new PdfPCell(new Phrase("NOMBRE", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderNombre);

                PdfPCell celdaHeaderApellidos = new PdfPCell(new Phrase("APELLIDOS", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderApellidos);

                PdfPCell celdaHeaderTelefonoM = new PdfPCell(new Phrase("TELEFONO", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderTelefonoM);

                PdfPCell celdaHeaderEmail = new PdfPCell(new Phrase("EMAIL", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderEmail);

                PdfPCell celdaHeaderCentroAprendizaje = new PdfPCell(new Phrase("CENTRO APRENDIZAJE", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderCentroAprendizaje);

                PdfPCell celdaHeaderCantAlumnos = new PdfPCell(new Phrase("CANTIDAD ALUMNOS", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderCantAlumnos);

                PdfPCell celdaHeaderCategoria = new PdfPCell(new Phrase("CATEGORIA", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderCategoria); 

                PdfPCell celdaHeaderUplineMaster = new PdfPCell(new Phrase("UPLINE MASTER", fuenteHeader));
                tablaInstructores.AddCell(celdaHeaderUplineMaster);

                tablaInstructores.WidthPercentage = 95;
                
                foreach(var instructorElemento in instructores){
                    PdfPCell celdaDataInstructorId = new PdfPCell(new Phrase(instructorElemento.InstructorId.ToString(), fuenteData));
                    tablaInstructores.AddCell(celdaDataInstructorId);

                    PdfPCell celdaDataNombre = new PdfPCell(new Phrase(instructorElemento.Nombre, fuenteData));
                    tablaInstructores.AddCell(celdaDataNombre);

                    PdfPCell celdaDataApellidos = new PdfPCell(new Phrase(instructorElemento.Apellidos, fuenteData));
                    tablaInstructores.AddCell(celdaDataApellidos);

                    PdfPCell celdaDataTelefonoM = new PdfPCell(new Phrase(instructorElemento.TelefonoM.ToString(), fuenteData));
                    tablaInstructores.AddCell(celdaDataTelefonoM);

                    PdfPCell celdaDataEmail = new PdfPCell(new Phrase(instructorElemento.Email, fuenteData));
                    tablaInstructores.AddCell(celdaDataEmail);

                    PdfPCell celdaDataCentroAprendizaje = new PdfPCell(new Phrase(instructorElemento.CentroAprendizaje, fuenteData));
                    tablaInstructores.AddCell(celdaDataCentroAprendizaje);

                    PdfPCell celdaDataCantAlumnos = new PdfPCell(new Phrase(instructorElemento.CantAlumnos.ToString(), fuenteData));
                    tablaInstructores.AddCell(celdaDataCantAlumnos);

                    PdfPCell celdaDataCategoria = new PdfPCell(new Phrase(instructorElemento.Categoria, fuenteData));
                    tablaInstructores.AddCell(celdaDataCategoria);

                    PdfPCell celdaDataUplineMaster = new PdfPCell(new Phrase(instructorElemento.UplineMaster, fuenteData));
                    tablaInstructores.AddCell(celdaDataUplineMaster);
                }

                document.Add(tablaInstructores);


                document.Close();

                byte[] byteData = workStream.ToArray();
                workStream.Write(byteData,0, byteData.Length);
                workStream.Position = 0;

                return workStream;
            }
        }
    }
}