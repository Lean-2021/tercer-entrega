import { Router } from "express";
import isAuth from "../middleware/Auth.js";
import os from "os";
const router = Router();

router.get("/", isAuth, (req, res) => {
  const { nombre, email, thumbnail, cart, age, phone, adress } = req.user;
  res.render("info", {
    title: "Infoweb - Info",
    nombre,
    email,
    thumbnail,
    age,
    adress,
    phone,
    product: cart,
  });
});

export default router;
