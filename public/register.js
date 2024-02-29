const errores = [true, 'el nombre de usuario debe tener minimo 8 caracteres', 'La Contraseña debe tener minimo 8 caracteres', 'la Contraseña no coincide']
let index = -1;
let userExist = true;

document.getElementById('registroForm').addEventListener('submit', async function(event) {
  event.preventDefault();
        
  const regusername = document.getElementById('regusername').value;
  const regpassword = document.getElementById('regpassword').value;
  const reg2password = document.getElementById('reg2password').value;

  try {
    const checkUser = await fetch('/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: regusername, password: regpassword })
    });
    if (checkUser.ok) {
      userExist = false;
      //console.log('Nombre de usuario nuevo');
    } else {
      alert('Nombre de usuario ya existente');
    }
  } catch (error) {
    console.error(error);
  }

  if (regusername.length < 8) {
    index = 1;
  } else if (regpassword.length < 8) {
    index = 2;
  } else if (regpassword !== reg2password) {
    index = 3;
  } else {
    index = 0;
  }

  if (errores[index] === true && userExist === false) {
    try {
      const response = await fetch('/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: regusername, password: regpassword })
      });

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        // Redirigir a la página de inicio de sesión después del registro exitoso
        window.location.href = '/login.html';
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  } else {
    if (userExist === false) {
      alert(errores[index]);
    }
  }
}); 