import dotenv from 'dotenv';
import { hashMD5, loadContract } from '../../utils/index.js';
import Item from './Model.js';
import Account from '../Account/Model.js';
import fileapis from '../../middlewares/fileapis.js';
dotenv.config();

/**
 * Description: Create new Item for Store
 * Request:     POST /item/create_item
 * Send:        JSON object which contains model, desc, brand, origin, distributor
 * Receive:     200 if success, otherwise fail
 */
async function POST_CreateItem(req, res, next) {
    const { model, sku, price, desc, brand, origin, distributor, folder } = req.body;

    // const { hashed_email, role } = req.user;
    // const hashed_email = '4cdaa0e01110e3d64916df5d2bc044cc'; //nkeyskuo124@gmail.com
    let store_id = await Account.findOne({ hashed_email: distributor }).select({ _id: 1 });
    const file = req.file;

    if (!file) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Image file not found',
        });
    }

    try {
        let new_item = await new Item({
            model,
            sku,
            price,
            desc,
            brand,
            origin,
            distributor: store_id,
            image: folder + '/' + file.filename,
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
            data: new_item,
        });
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: error,
        });
    }
}

async function DELETE_item(req, res, next) {
    const { id } = req.params;

    try {
        let item = Item.findByIdAndDelete(id);
        if(item) {
            fileapis.deleteSync('./src/public/uploads' + item.image, (err) => {
                if(err) {
                    return res.json({
                        success: false,
                        status: 500,
                        msg: 'Delete item fail: ' + err
                    })
                }
            })
        }
        return res.json({
            success: true,
            status: 200,
            data: item,
            msg: 'Deleted item',
        });
    } catch (error) {
        return res.json({
        success: false,
        status: 500,
        msg: 'Delete item fail: ' + error
    })
    }
}

/**
 * Description: Get info of specific item
 * Request:     GET /item/get_item_info
 * Send:        JSON data which contains _id as param
 * Receive:     200 + item if success, otherwise fail
 */
async function GET_ItemInfo(req, res, next) {
    try {
        const { id } = req.params;

        let item = Item.findById(id).lean();

        // Smart contract
        // const contract = await loadContract();
        // let item = await contract.get_item_info({
        //     item_id: item_id,
        // });

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

/**
 * Description: Get All Items that match the filter
 * Request:     GET /item/get_all_items
 * Send:        Filter or nothing as query
 * Receive:     200 + items if success , otherwise fail
 */
async function GET_AllItems(req, res, next) {
    try {
        let filter = { ...req.query };
        let items = await Item.find(filter).lean();

        // Smart Contract
        // const contract = await loadContract();
        // let items = await contract.get_all_items();

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

export { GET_AllItems, GET_ItemInfo, POST_CreateItem, DELETE_item };
