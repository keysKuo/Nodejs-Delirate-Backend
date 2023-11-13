import multer from 'multer';
import fileapis from './fileapis.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.headers['folder-path'];
        
        fileapis.createSync('./src/public/uploads' + folder, err => {
            console.log(err);
        });

        cb(null, './src/public/uploads' + folder);
    },
    
    filename: (req, file, cb) => {
        const folder = req.headers['folder-path'];
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        let filename = Date.now() + ext;
        
        if(folder.endsWith('avatar')) {
            filename = 'avatar' + ext;
        }

        cb(null, filename);
    }
})

const upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }
})

export default upload;
