document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
        
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Almacenar el token JWT en el almacenamiento local o en una cookie
      localStorage.setItem('token', data.token);
      // Redirigir a la página de inicio después de iniciar sesión
      window.location.href = '/inicio';
    } else {
      alert('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
  }
});