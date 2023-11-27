const multer = require('multer');

const uploadImage = (folderName) => {

    const storage = multer.diskStorage({
        destination: `public/images/${folderName}`,
        filename: function (req, file, cb){
            console.log(file);
            let nombreOriginal = file.originalname;
            let extension = nombreOriginal.slice(nombreOriginal.lastIndexOf(".", nombreOriginal.length))
            console.log(extension);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            console.log(uniqueSuffix + extension);
            cb(null, uniqueSuffix + extension )
        }
    }
    )
      //"img" es un valor recogido del formulario en el name del input
    const upload = multer({ storage: storage }).single("img");
    return upload;
}

module.exports = uploadImage;


