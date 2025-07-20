import mongoose from "mongoose";
import { DB_Name } from "./constants";


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)  
        console.log("Connected to MongoDB successfully");   
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB; 