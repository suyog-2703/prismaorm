import prisma from "../DB/db.config.js"; 
import vine, { errors } from "@vinejs/vine";
import { registerSchema,loginSchema } from "../Validation/authValidation.js";
import jwt from 'jsonwebtoken';

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

  static async login(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);
  
      // Find the user using email
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });
  
      if (!findUser) {
        return res.status(400).json({
          errors: {
            email: "No user found with this email id",
          },
        });
      }
  
      // Check password
      if (!bcrypt.compareSync(payload.password, findUser.password)) {
        return res.status(400).json({
          errors: {
            email: "Invalid credentials, please enter correct details",
          },
        });
      }


      const payloadData={
        id:findUser.id,
        first_name:findUser.first_name,
        last_name:findUser.last_name,
        email:findUser.email
      }

      const token = jwt.sign(payloadData, process.env.JWT_SECRET, { expiresIn: '365d' });


      console.log(`Generated Token:Bearer ${token}`);

      return res.json({
        message:"Logged IN",
        access_token:`Bearer ${token}`
      });
  
      // Successful login
      // return res.status(200).json({
      //   message: "Login successful",
      //   access_token:`Bearer ${token}`
        // user: {
        //   id: findUser.id,
        //   first_name: findUser.first_name,
        //   last_name: findUser.last_name,
        //   email: findUser.email,
        // },
      // });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json(error.messages);
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again",
        });
      }
    }
  }
  
}

export default AuthController;
