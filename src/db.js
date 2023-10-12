import mongoose from 'mongoose';    

export const connectDB=async ()=>{
    try {
        await mongoose.connect("mongodb+srv://user:user123@cluster0.lwr6klj.mongodb.net/merndb?retryWrites=true&w=majority")
       
        console.log('>>>Conectado a DB');
    } catch (error) {
        console.log(error);
    }
}