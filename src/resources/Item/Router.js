import { GET_AllItems, GET_ItemInfo, POST_CreateItem } from "./Resolver.js";
import express from 'express';
import upload from '../../middlewares/multer.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base_url = `D:/Study/Blockchain/NEAR-MERN-Delirate-Blockchain2023/`;
const router = express.Router();

router.get('/get_item_info/:item_id', GET_ItemInfo);
router.get('/get_all_items', GET_AllItems);

router.post('/create_item', upload.single('item-image'),  POST_CreateItem);
router.get('/create_item', (req, res, next) => {
    return res.sendFile(path.join(__dirname,'create.html'));
})
export default router