document.getElementById('formulario').addEventListener('submit', function (e) {
    const documento = document.getElementById('documento').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Validaciones con expresiones regulares
    const soloNumeros = /^[0-9]+$/;

    if (!soloNumeros.test(documento) || documento.length < 5 || documento.length > 20) {
        e.preventDefault();
        Swal.fire('Error', 'El número de documento debe tener entre 5 y 20 dígitos numéricos.', 'error');
        return;
    }

    if (!soloNumeros.test(telefono) || telefono.length !== 10) {
        e.preventDefault();
        Swal.fire('Error', 'El teléfono debe tener exactamente 10 dígitos numéricos.', 'error');
        return;
    }
});


['telefono', 'documento'].forEach(id => {
    document.getElementById(id).addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo números
    });
});
