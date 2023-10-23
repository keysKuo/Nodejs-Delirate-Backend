import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import nearAPI from 'near-api-js'
dotenv.config()

const { keyStores, connect, Contract, KeyPair } = nearAPI;

const ACCOUNT_ID = process.env.ACCOUNT_ID || "nkeyskuo147.testnet"
const NETWORK_ID = process.env.NETWORK_ID || "testnet";

const KEY_STORE = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'ed25519:59y2NCBgSQbxAkzytyYSvc2Z4EFGRD2WECa7ppPF6SGpMAfWyHu93Fez1HkYxSmbiUzrXhchrEw5Jx2kKJqeo5BE';
const keyPair = KeyPair.fromString(PRIVATE_KEY);


function mailForm(options) {
    let logo_link = options.logo_link || process.env.LOGO_LINK;
    let caption = options.caption || '';
    let content = options.content || '';
    
    return `<div 
        style="width: 35%; margin: 0 auto;
        text-align: center; font-family: 'Google Sans', Roboto, sans-serif;
        min-height: 300px; padding: 40px 20px;
        border-width: thin; border-style: solid; border-color: #dadce0; border-radius: 8px">

        <img style="width: 296px;
        aspect-ratio: auto 74 / 24;
        height: 96px;" src="${logo_link}" />

        <div style="
            color: rgba(0,0,0,0.87);
            line-height: 32px;
            padding-bottom: 24px;
            text-align: center;
            word-break: break-word;
            font-size: 24px">

            ${caption}
        </div>

        <div style="border: thin solid #dadce0;
            color: rgba(0,0,0,0.87);
            line-height: 26px;
            text-align: center;
            word-break: break-word;
            font-size: 18px">

            ${content}
        </div>

        <p>Mọi thắc mắc vui lòng liên hệ contact.ezgroup@gmail.com</p>
        <p>Hotline: 0767916592 - SUD Technology</p>
    </div>
    `;
};

// Hash password using bcrypt
function hashBcrypt(password) {
    return bcrypt.hashSync(password, 10);
}

// Hash email using md5
function hashMD5(email) {
    return crypto.createHash('md5').update(email).digest('hex');
}


async function loadContract() {
    await KEY_STORE.setKey(NETWORK_ID, ACCOUNT_ID , keyPair)
    
    const connectionConfig = {
        networkId: NETWORK_ID,
        keyStore: KEY_STORE, // first create a key store 
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account(ACCOUNT_ID);
    
    const ctr = new Contract(
        account, // the account object that is connecting
        process.env.CONTRACT_ID || "dev-1697953744968-41792685867726",
        {
            // name of contract you're connecting to
            viewMethods: ["get_customer_info", "get_retailer_info", "get_item_info", "get_all_items"], // view methods do not change state but usually return a value
            changeMethods: ["register_customer", "register_retailer", "create_item"], // change methods modify state
        }
    );

    return ctr;
}

export { mailForm, hashBcrypt, hashMD5, loadContract };