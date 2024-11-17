import prisma from "../DB/db.config.js"; 
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../Validation/authValidation.js";
import bcrypt from "bcryptjs"
import { messages } from "@vinejs/vine/defaults";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      //email if already exists
      const findUser=await prisma.users.findUnique({
        where:{
          email:payload.email
        }
      })

      if(findUser){
        return res.status(400).json({
          errors:{
            email:"Email is already taken. Use another one"
          }
        });
      }

      
      //encrypt
      const salt=bcrypt.genSaltSync(10)
      payload.password=bcrypt.hashSync(payload.password,salt)

      //send data on the db
      const user = await prisma.users.create({
        
        // data: {
        //   first_name: payload.first_name,
        //   last_name: payload.last_name,
        //   email: payload.email,
        //   password: payload.password,
        // },
        data:payload
      });

      return res.json({status:200,message:'User Created Succesfully', user });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json(error.messages); // Send errors in the desired format
      }
      else{
        res.status(500).json({status:500,message:"Something went wrong. Please try again"})
      }
    }
  }
}

export default AuthController;
