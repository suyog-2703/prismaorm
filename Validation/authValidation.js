import vine from "@vinejs/vine";
import { CustomeErrorReporter } from "./CustomeErrorReporter.js";

vine.errorReporter=()=>new CustomeErrorReporter();

export const registerSchema = vine.object({
    first_name: vine.string().minLength(2).maxLength(50),
    last_name: vine.string().minLength(2).maxLength(50),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(100).confirmed()
  });
  

  export const loginSchema=vine.object({
    email:vine.string().email(),
    password:vine.string()
  })