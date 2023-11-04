import dotenv from 'dotenv';
import { hashMD5, loadContract } from '../../utils/index.js';
import Item from './Model.js';
dotenv.config();

async function POST_CreateItem(req, res, next) {
    const { model, desc, brand, origin, distributor } = req.body;
    // const { hashed_email, role } = req.user;
    const hashed_email = hashMD5(distributor) || '4cdaa0e01110e3d64916df5d2bc044cc'; //nkeyskuo124@gmail.com

    const file = req.file;

    if (!file) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Image file not found',
        });
    }

    if(!model || !desc || !brand || !origin) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Please fill enough information',
        });
    }

    try {
        let new_item = await new Item({
            item_id: "J" + Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
            model, desc, brand, origin, distributor,
            image: file.filename
        }).save();

        // Smart Contract
        // const contract = await loadContract();
        // await contract.create_item({
        //     args: {
        //         model: model,
        //         desc: desc,
        //         brand: brand,
        //         origin: origin,
        //         image: file.filename,
        //         distributor: hashed_email,
        //     },
        // });
        // <-->

        return res.json({
            success: true,
            status: 200,
            msg: 'Item created',
            data: new_item
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
