function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.remove('bi-eye-fill');
    eyeIcon.classList.add('bi-eye-slash-fill');
    } else {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('bi-eye-slash-fill');
    eyeIcon.classList.add('bi-eye-fill');
    }
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "admin@correo.com" && password === "123456") {
    Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso',
        timer: 2000,
        showConfirmButton: false
    });
    } else {
    Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Correo o contraseña incorrectos'
    });
    }
});