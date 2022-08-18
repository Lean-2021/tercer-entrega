import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../DB/models/usuarios.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const localStrategy = Strategy;
const mailAdmin = "pruebacoder@gmail.com"; //mail de ejemplo para registro de nuevos usuarios

passport.use(
  //passport refistro de usuarios
  "signUp",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({ email });
        if (usuario) {
          return done(null, false);
        }
        const user = new Usuarios();
        const { nombre, age, adress, phone } = req.body;
        user.nombre = nombre;
        user.email = email;
        user.password = user.encrypta(password);
        user.age = age;
        user.phone = phone;
        user.adress = adress;
        user.thumbnail = req.file.path;
        console.log(req.file);
        await user.save();
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
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
// Login de usuarios
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await Usuarios.findOne({ email });
      if (!user || user.compara(password, user.password) === false) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await Usuarios.findById(id);
  done(null, user);
});
