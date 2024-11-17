import prisma from "../DB/db.config.js"; 
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../Validation/authValidation.js";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);
      return res.json({ payload });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json(error.messages); // Send errors in the desired format
      }
      console.error("Unexpected error:", error);
      return res.status(500).json({ errors: "Internal server error" });
    }
  }
}

export default AuthController;
