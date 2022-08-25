import nodemailer from "nodemailer";
import usuarios from "../DB/models/usuarios.js";
import { loggerError } from "./logger.js";

export const sendMail = async () => {
  try {
    const mailAdmin = "pruebacoder@gmail.com"; //mail de ejemplo para registro de nuevos usuarios
    const user = new usuarios();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASS}`,
      },
    });
    await transporter.sendMail({
      from: `Info Web ${mailAdmin}`,
      to: mailAdmin,
      subject: "nuevo registro",
      html: `
              <h2>Nuevo Usuario Registrado</h2>
              <h3>Datos:</h3>
              <p>Nombre: ${user.nombre}</p>
              <p>Email: ${user.email}</p>
              <p>Edad: ${user.age}</p>
              <p>Dirección: ${user.adress}</p>
              <p>Teléfono: ${user.phone}</p>
              `,
    });
  } catch (error) {
    loggerError.log("error", "Error en el envio del mail", error);
  }
};
