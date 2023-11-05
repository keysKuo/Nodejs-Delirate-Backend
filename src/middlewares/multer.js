import multer from 'multer';
import fileapis from './fileapis.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const { hashed_email } = req.user;
        
        const hashed_email = '4cdaa0e01110e3d64916df5d2bc044cc';

        let path = './src/public/uploads/' + hashed_email;
        
        fileapis.createSync(path, err => {
            console.log(err);
        });

        req.folder = path;
        cb(null, path);
    },

    filename: (req, file, cb) => {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }
})

export default upload;
