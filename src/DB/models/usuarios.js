import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  //modelo de datos usuario
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
  },
});

usuarioSchema.methods.encrypta = (password) => {
  //encryptar contraseña
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

usuarioSchema.methods.compara = (newpassword, password) => {
  //comparar contraseñas
  return bcrypt.compareSync(newpassword, password);
};

export default mongoose.model("usuarios", usuarioSchema);
