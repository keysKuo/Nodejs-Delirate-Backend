import { DELETE_item, GET_AllItems, GET_ItemInfo, POST_CreateItem } from "./Resolver.js";
import express from 'express';
import upload from '../../middlewares/multer.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/get_item_info/:id', GET_ItemInfo);
router.get('/get_all_items', GET_AllItems);

router.post('/create', upload.single('file'),  POST_CreateItem);
router.delete('/delete/:id',  DELETE_item);

export default router