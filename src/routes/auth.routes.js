import {Router} from 'express'; 
import { login, register,logout,profile } from '../controllers/auth.controller.js';
import {authRequired} from '../middlewares/validateToken.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";
const router= Router()


//creamos las rutas de nuestros endpoints
router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema),login)
router.post('/logout',logout)
//para empezar a hacer nuestras rutas protegidas
router.get('/profile', authRequired,profile )

export default router;