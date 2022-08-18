import { Router } from "express";
import Usuario from "../DB/models/usuarios.js";

const router = Router();
const usuario = new Usuario();

router.get("/", async (req, res) => {
  const { nombre, email, thumbnail } = req.user;
  const productCart = await usuario.cart;
  res.render("cart", {
    title: "Infoweb - Cart",
    product: productCart,
    nombre,
    email,
    thumbnail,
  });
});

export default router;
