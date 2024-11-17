import { messages } from '@vinejs/vine/defaults';
import jwt from 'jsonwebtoken'
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader===null || authHeader=== undefined){
        return res.status(401).json({status:401, message:'UnAuthorised'})
    }

    const token=authHeader.split(" ")[1]

    //verify the jwt token
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            console.log("error jwt", err);
            
            return res.status(401).json({status:401, message:'UnAuthorised'}) 
        }
            
        req.user=user
        next()
    })
}
export default authMiddleware;