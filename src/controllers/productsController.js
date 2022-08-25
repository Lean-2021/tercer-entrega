import { Products } from "../daos/apiProducts.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { loggerError } from "../utils/logger.js";

dotenv.config();
const api = new Products();

export const getProduct = async (req, res) => {
  try {
    const showProducts = await api.getProduct();
    res.json(showProducts);
  } catch (error) {
    loggerError.log("error", error);
  }
};

export const getOneProduct = async (req, res) => {
  const mailAdmin = "pruebacoder@gmail.com"; //mail de ejemplo para envio de pedidos y proceso del mismo
  try {
    const { id } = req.params;
    const { nombre, email } = req.user;
    const product = await api.getById(id);
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
      subject: `Nuevo pedido de Nombre: ${nombre}, email : ${email}`,
      html: `
          <h2>Detalle de la compra</h2>
          <p>Producto:${product.title}</p>
          <p>Precio: $ ${product.price}</p>
        `,
    });
    await transporter.sendMail({
      from: `Info Web ${mailAdmin}`,
      to: `<${email}>`,
      subject: `Info Web - Pedido solicitado`,
      html: `
          <h3>Su pedido fue recibido y se encuentra en proceso de preparación</h3>
          <h4><b>GRACIAS POR SU COMPRA</b></h4>
        `,
    });
  } catch (error) {
    loggerError.log("error", error);
  }
};
