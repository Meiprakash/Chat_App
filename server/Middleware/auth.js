import jwt from "jsonwebtoken"
import userModel from "../Models/userSchema.js";

//middleware

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res
            .status(401)
            .json({ success: false, message: "JWT must be provided" });
        }

        // extract token after "Bearer "
        const token = authHeader.split(" ")[1];



        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await userModel.findById(decoded.userId).select("-password")//userId means namaloda userData irukra id.

        if (!user) return res.status(404).json({ success: false, message: "USer not found" })
        
        req.user = user
        next()
    } catch (e) {
        console.log("error message for authuentication", e.message);
        
        res.status(401).json({ success: false, message: e.message })
    }
}
    
