document.addEventListener("DOMContentLoaded", () => {
  const latInput = document.getElementById("latitud");
  const lonInput = document.getElementById("longitud");
  const estado = document.getElementById("estado");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      latInput.value = pos.coords.latitude;
      lonInput.value = pos.coords.longitude;
    }, err => {
      estado.textContent = "No se pudo obtener ubicación. Asegúrate de permitir acceso al GPS.";
    });
  }

  document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();
    estado.textContent = "Enviando...";

    const form = e.target;
    const archivo = form.imagen.files[0];

    if (!archivo) {
      estado.textContent = "Por favor selecciona una imagen.";
      return;
    }

    // Convertir imagen a Base64
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64 = reader.result.split(',')[1];

      const data = {
        nombre: form.nombre.value,
        infraccion: form.infraccion.value,
        observaciones: form.observaciones.value,
        latitud: latInput.value,
        longitud: lonInput.value,
        imagen: base64
      };

      fetch("https://script.google.com/macros/s/AKfycbwuA6onw5oAlTGtZcU2JrXPknGaW6MoQvvCeypktc8wQPdMaLB7jSK-SsMICn20zCdy/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      Swal.fire({
        icon: 'success',
        title: 'Enviado',
        text: 'Formulario enviado correctamente.',
        confirmButtonColor: '#3085d6'
      });

      form.reset();
      estado.textContent = "";
    };
    reader.readAsDataURL(archivo);
  });
});