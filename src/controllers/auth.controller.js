import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js ';


//creacion de las funciones que ejecutara cada endponit
export const register=async(req,res)=> {
    //recuperamos los datos mandados por el cliente
   const{email,password,username}=req.body
   
   try {
    //encriptamos nuestro password que envio el cliente
   const passwordHash=await bcrypt.hash(password,10)

   //creamos nuestro nuevo usuario que guardaremos en mongodb
   const newUser=new User({
    username,
    email,
    password:passwordHash
   })

  //guardamos nuestro nuevo usuario en la bd
  const userSaved=await newUser.save()

  //creacion del token de acceso
  const token =await createAccessToken({id:userSaved._id})
  //guardamos el token en la cookie
  res.cookie("token",token)

  //le mandamos al front el usuario que se creo en un json
  res.json({
    id:userSaved._id,
    username:userSaved.username,
    email:userSaved.email,
    createdAt:userSaved.createdAt,
    updatedAt:userSaved.updatedAt
  })                 
  
   } catch (error) {
    res.status(500).json({
        message:error.message
    })
   }
};


export const login=async(req,res)=> {
    //recuperamos los datos mandados por el cliente
    const { email, password } = req.body; // Obtén el correo y la contraseña desde la solicitud HTTP

    try {
      const userFound = await User.findOne({ email }); // Busca un usuario en la base de datos por correo
    
      if (!userFound) {
        // Si no se encuentra un usuario con ese correo
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
    
      const isMatch = await bcrypt.compare(password, userFound.password); // Compara la contraseña ingresada con la almacenada
    
      if (!isMatch) {
        // Si las contraseñas no coinciden
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
    
      const token = await createAccessToken({ id: userFound._id }); // Crea un token de acceso
    
      res.cookie("token", token); // Establece el token como una cookie en la respuesta HTTP
    
      res.json({
        // Devuelve información del usuario en una respuesta JSON
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      });
    } catch (error) {
      // En caso de errores en el proceso
      res.status(500).json({
        message: error.message
      });
    }
    
 };


 export const logout=(req,res)=>{
  res.cookie('token','',
  {
      expires:new Date(0)
  })
  return res.sendStatus(200)
}


export const profile=async(req,res)=>{
 const userFound=await User.findById(req.user.id)
 if(!userFound) return res.status(400).json({message:"usuario no encontrado"})
 res.json({
  // Devuelve información del usuario en una respuesta JSON
  id: userFound._id,
  username: userFound.username,
  email: userFound.email,
  createdAt: userFound.createdAt,
  updatedAt: userFound.updatedAt
});

 
}

