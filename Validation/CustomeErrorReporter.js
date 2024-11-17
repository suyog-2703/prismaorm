// import { errors } from "@vinejs/vine";

// export class CustomeErrorReporter {
//   hasErrors = false;
//   errors = []; // Changed to an array

//   report(message, rule, field, meta) {
//     this.hasErrors = true;
//     this.errors.push({
//       code: rule,
//       detail: message,
//       source: {
//         pointer: field.wildCardPath,
//       },
//       ...(meta ? { meta } : {}),
//     });
//   }

//   createError() {
//     return new errors.E_VALIDATION_ERROR(this.errors);
//   }
// }



import { errors } from "@vinejs/vine";

export class CustomeErrorReporter {
  hasErrors = false;
  errors = {}; // Changed to an object to store field-error pairs

  report(message, rule, field, meta) {
    this.hasErrors = true;
    this.errors[field.wildCardPath] = message; // Map field name to error message
  }

  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}
