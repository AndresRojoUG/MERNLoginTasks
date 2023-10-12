import mongoose from 'mongoose'; // Importa Mongoose para definir un esquema y un modelo

// Define un esquema para los usuarios
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco innecesarios
    },
    email: {
        type: String,
        required: true, // Campo requerido
        trim: true, // Elimina espacios en blanco innecesarios
        unique: true // Debe ser único en la colección
    },
    password: {
        type: String,
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco innecesarios
    }
}, {
    timestamps: true // Habilita la creación automática de campos de fecha y hora (createdAt y updatedAt)
});

// Exporta un modelo de usuario basado en el esquema
export default mongoose.model('User', userSchema);
