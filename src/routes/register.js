import { Router } from "express";
import passport from "passport";
import uploadFile from "../../multer.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("register", {
    title: "Infoweb - Registro",
  });
});

router.post(
  "/",
  uploadFile(),
  passport.authenticate("signUp", {
    failureRedirect: "/errorRegister",
    successRedirect: "/login",
  })
);

export default router;
