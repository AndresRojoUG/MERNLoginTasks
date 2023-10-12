import { TOKEN_SECRET } from '../config.js'; // Importa la clave secreta para firmar el token
import jwt from 'jsonwebtoken'; // Importa la biblioteca 'jsonwebtoken' para manejar tokens JWT

// Función para crear un token de acceso
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // La información que se incluirá en el token (por ejemplo, el ID del usuario)
      TOKEN_SECRET, // La clave secreta utilizada para firmar el token
      {
        expiresIn: "1d" // El token expirará después de 1 día
      },
      (err, token) => {
        if (err) {
          // Si hay un error al firmar el token
          return reject(err);
        }
        resolve(token); // Devuelve el token generado
      }
    );
  });
}

