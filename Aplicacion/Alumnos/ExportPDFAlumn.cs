using System.IO;
using System.Threading;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Alumnos
{
    public class ExportPDFAlumn
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

                var alumnos = await _context.Alumno.ToListAsync();

                MemoryStream workStream = new MemoryStream();
                Rectangle rect = new Rectangle(PageSize.A4);

                Document document = new Document(rect, 40, 40, 50, 100);
                PdfWriter writer = PdfWriter.GetInstance(document, workStream);
                writer.CloseStream = false;

                document.Open();
                document.AddTitle("Lista de Alumnos de YouLEAD");
                
                PdfPTable tabla = new PdfPTable(1);
                tabla.WidthPercentage = 90;
                PdfPCell celda = new PdfPCell(new Phrase("Lista de Alumnos de YOULEAD", fuenteTitulo )) ;
                celda.Border = Rectangle.NO_BORDER;
                tabla.AddCell(celda);
                document.Add(tabla);

                PdfPTable tabla1 = new PdfPTable(1);
                tabla1.WidthPercentage = 90;
                PdfPCell celda1 = new PdfPCell(new Phrase(" ", fuenteTitulo )) ;
                celda1.Border = Rectangle.NO_BORDER;
                tabla1.AddCell(celda1);
                document.Add(tabla1);

                PdfPTable tablaAlumnos = new PdfPTable(8);
                float[] widths = new float[]{15f, 40f, 40f, 20f, 40f, 50f, 40f, 50f};
                tablaAlumnos.SetWidthPercentage(widths, rect);

                PdfPCell celdaHeaderAlumnoId = new PdfPCell(new Phrase("ID", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderAlumnoId);

                PdfPCell celdaHeaderNombreAlumno = new PdfPCell(new Phrase("NOMBRE", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderNombreAlumno);

                PdfPCell celdaHeaderApellidosAlumno = new PdfPCell(new Phrase("APELLIDOS", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderApellidosAlumno);

                PdfPCell celdaHeaderaEdad = new PdfPCell(new Phrase("EDAD", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderaEdad);

                PdfPCell celdaHeaderTelefono = new PdfPCell(new Phrase("TELEFONO", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderTelefono);

                PdfPCell celdaHeaderEmailAlumno = new PdfPCell(new Phrase("EMAIL", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderEmailAlumno);

                PdfPCell celdaHeaderEscuelaProcedencia = new PdfPCell(new Phrase("ESCUELA PROCEDENCIA", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderEscuelaProcedencia);

                PdfPCell celdaHeaderGradoEstudio = new PdfPCell(new Phrase("GRADO ESTUDIOS", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderGradoEstudio);

                /*PdfPCell celdaHeaderUplineMaster = new PdfPCell(new Phrase("UPLINE MASTER", fuenteHeader));
                tablaAlumnos.AddCell(celdaHeaderUplineMaster);*/

                tablaAlumnos.WidthPercentage = 95;
                
                foreach(var alumnoElemento in alumnos){
                    PdfPCell celdaDataAlumnoId = new PdfPCell(new Phrase(alumnoElemento.AlumnoId.ToString(), fuenteData));
                    tablaAlumnos.AddCell(celdaDataAlumnoId);

                    PdfPCell celdaDataNombreAlumno = new PdfPCell(new Phrase(alumnoElemento.NombreAlumno, fuenteData));
                    tablaAlumnos.AddCell(celdaDataNombreAlumno);

                    PdfPCell celdaDataApellidosAlumno = new PdfPCell(new Phrase(alumnoElemento.ApellidosAlumno, fuenteData));
                    tablaAlumnos.AddCell(celdaDataApellidosAlumno);

                    PdfPCell celdaDataEdad = new PdfPCell(new Phrase(alumnoElemento.Edad.ToString(), fuenteData));
                    tablaAlumnos.AddCell(celdaDataEdad);

                    PdfPCell celdaDataTelefono = new PdfPCell(new Phrase(alumnoElemento.Telefono.ToString(), fuenteData));
                    tablaAlumnos.AddCell(celdaDataTelefono);

                    PdfPCell celdaDataEmailAlumno = new PdfPCell(new Phrase(alumnoElemento.EmailAlumno, fuenteData));
                    tablaAlumnos.AddCell(celdaDataEmailAlumno);

                    PdfPCell celdaDataEscuelaProcedencia = new PdfPCell(new Phrase(alumnoElemento.EscuelaProcedencia, fuenteData));
                    tablaAlumnos.AddCell(celdaDataEscuelaProcedencia);

                    PdfPCell celdaDataGradoEstudio = new PdfPCell(new Phrase(alumnoElemento.GradoEstudio, fuenteData));
                    tablaAlumnos.AddCell(celdaDataGradoEstudio);

                    /*PdfPCell celdaDataUplineMaster = new PdfPCell(new Phrase(alumnoElemento.UplineMaster, fuenteData));
                    tablaAlumnos.AddCell(celdaDataUplineMaster);*/
                }

                document.Add(tablaAlumnos);


                document.Close();

                byte[] byteData = workStream.ToArray();
                workStream.Write(byteData,0, byteData.Length);
                workStream.Position = 0;

                return workStream;
            }
        }
    }
}