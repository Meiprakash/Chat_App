import mongoose from "mongoose";
import "dotenv/config";


 const DB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("DB connected successfully");
        
    } catch (error) {
        console.log("its make a Error",error.message);
        
    }
}
export default DB