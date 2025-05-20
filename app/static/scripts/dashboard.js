//CORREGIR TODO PARA QUE SE ADAPTE A TRAER LOS DATOS DE LA BASE DE DATOS
const registros = [
    {
      nombre: "Juan Pérez",
      documento: "123456789",
      correo: "juan@email.com",
      telefono: "3216549870",
      infraccion: "Exceso de velocidad",
      observaciones: "Conductor en moto.",
      latitud: "4.60971",
      longitud: "-74.08175",
      fecha: "2025-05-17T10:32"
    },
    {
      nombre: "Ana Torres",
      documento: "987654321",
      correo: "ana@email.com",
      telefono: "3102568741",
      infraccion: "Mal estacionado",
      observaciones: "Zona peatonal.",
      latitud: "4.65145",
      longitud: "-74.10622",
      fecha: "2025-04-09T08:22"
    }
  ];

  const cuerpoTabla = document.getElementById("contenidoTabla");

  function cargarTabla(filtrados) {
    cuerpoTabla.innerHTML = "";
    filtrados.forEach(reg => {
      const fila = document.createElement("tr");
      for (const key of ["nombre", "documento", "correo", "telefono", "infraccion", "observaciones", "latitud", "longitud", "fecha"]) {
        const celda = document.createElement("td");
        celda.textContent = reg[key];
        fila.appendChild(celda);
      }
      cuerpoTabla.appendChild(fila);
    });
  }

  // Carga inicial
  cargarTabla(registros);

  // Filtros en vivo
  document.getElementById("filtroDocumento").addEventListener("input", filtrar);
  document.getElementById("filtroInfraccion").addEventListener("input", filtrar);
  document.getElementById("filtroMes").addEventListener("input", filtrar);

  function filtrar() {
    const doc = document.getElementById("filtroDocumento").value.toLowerCase();
    const infr = document.getElementById("filtroInfraccion").value.toLowerCase();
    const mes = document.getElementById("filtroMes").value; // formato yyyy-mm

    const resultado = registros.filter(r => {
      return (
        r.documento.toLowerCase().includes(doc) &&
        r.infraccion.toLowerCase().includes(infr) &&
        (!mes || r.fecha.startsWith(mes))
      );
    });

    cargarTabla(resultado);
  }

  function descargarCSV() {
    const filas = Array.from(cuerpoTabla.querySelectorAll("tr"));
    if (filas.length === 0) {
      Swal.fire("No hay datos para descargar", "", "warning");
      return;
    }

    let csv = "Nombre,Documento,Correo,Teléfono,Infracción,Observaciones,Latitud,Longitud,Fecha\n";
    filas.forEach(fila => {
      const columnas = fila.querySelectorAll("td");
      const filaCSV = Array.from(columnas).map(celda => `"${celda.textContent}"`).join(",");
      csv += filaCSV + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "historial_infracciones.csv";
    enlace.click();

    Swal.fire("Descarga completada", "El historial se ha descargado como CSV", "success");
  }