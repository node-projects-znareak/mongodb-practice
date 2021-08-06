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

export const userSchemaValidation = yup.object({
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
    password: yup
      .string()
      .min(6, "Mínimo 6 carácteres para la contraseña")
      .max(20, "Máximo 20 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
  }),
});

export const projectSchemaValidation = yup.object({
  body: yup.object({
    title: yup.string().required("El título es obligatorio"),
    description: yup
      .string()
      .max(200, "La longitud máxima es de 200 carácteres"),
    year: yup
      .number()
      .typeError("El año debe ser un número")
      .positive("El año debe ser postivio")
      .integer("El año debe ser entero")
      .required("El año es requerido"),
    people: yup.array(),
  }),
});
