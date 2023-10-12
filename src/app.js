// Importa las bibliotecas y módulos necesarios
import express from 'express'; // Importa Express para crear una aplicación web
import morgan from 'morgan'; // Importa Morgan para registrar solicitudes HTTP
import authRoutes from './routes/auth.routes.js'; // Importa las rutas relacionadas con la autenticación
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/tasks.routes.js';
// Crea una instancia de la aplicación Express
const app = express();

// Configura el registro de solicitudes HTTP con Morgan en formato 'dev'
app.use(morgan('dev'));

// Habilita el análisis de datos JSON en las solicitudes
app.use(express.json());

//lee las cookies algo parecido al express.json
app.use(cookieParser())

// Agrega las rutas relacionadas con la autenticación bajo la ruta '/api'
app.use("/api", authRoutes);

// Agrega las rutas relacionadas con las tareas bajo la ruta '/api'
app.use("/api", taskRoutes);

// Exporta la aplicación Express configurada
export default app;
