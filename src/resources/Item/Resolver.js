import dotenv from 'dotenv';
import { loadContract } from '../../utils/index.js';
dotenv.config();

async function POST_CreateItem(req, res, next) {
    const { model, desc, brand, origin } = req.body;
    // const { hashed_email, role } = req.user;
    const hashed_email = '4cdaa0e01110e3d64916df5d2bc044cc';
    const role = 'retailer';

    if (role != 'retailer') {
        return res.json({
            success: false,
            status: 300,
            msg: 'Only retailers can create item',
        });
    }

    const file = req.file;

    if (!file) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Image file not found',
        });
    }

    const contract = await loadContract();
    try {
        await contract.create_item({
            args: {
                model: model,
                desc: desc,
                brand: brand,
                origin: origin,
                image: file.filename,
                distributor: hashed_email,
            },
        });

        return res.json({
            success: true,
            status: 200,
            msg: 'Item created',
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error,
        });
    }
}

async function GET_ItemInfo(req, res, next) {
    const contract = await loadContract();
    const { item_id } = req.params;

    try {
        let item = await contract.get_item_info({
            item_id: item_id,
        });

        return res.json({
            success: true,
            status: 200,
            data: item,
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error,
        });
    }
}

async function GET_AllItems(req, res, next) {
    const contract = await loadContract();

    try {
        let items = await contract.get_all_items();

        return res.json({
            success: true,
            status: 200,
            data: items,
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error,
        });
    }
}

export { GET_AllItems, GET_ItemInfo, POST_CreateItem };
