import * as yup from "yup";

export const validationsSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(3, "Mínimo 3 carácteres")
      .max(50, "Máximo 3 carácteres")
      .required("El nombre es obligatorio, debe ser entre 3 y 50 carácteres"),
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
  }),
});
validationsSchema.validate;
