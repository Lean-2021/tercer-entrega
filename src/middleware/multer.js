import multer from "multer";

const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: "./public/assets/image", //guardar imagen en carpeta image de public

    filename: function (req, file, cb) {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      cb(null, Date.now() + extension); // reemplazar el nombre de la imagen
    },
  });

  const upload = multer({ storage: storage }).single("thumbnail");
  return upload;
};

export default uploadFile;
