import vine from "@vinejs/vine";
import { CustomeErrorReporter } from "./CustomeErrorReporter.js";

vine.errorReporter=()=>new CustomeErrorReporter();

export const registerSchema=vine.object({
    name:vine.string().minLength(2).maxLength(50),
    email:vine.string().email(),
    password:vine.string().minLength(2).maxLength(100).confirmed()
});