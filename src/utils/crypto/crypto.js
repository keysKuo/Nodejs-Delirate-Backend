import { Crypt, RSA } from 'hybrid-crypto-js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto-js';

function hashBcrypt(password) {
    return bcrypt.hashSync(password, 10);
}

function hashSHA256(data) {
    return crypto.SHA256(JSON.stringify(data)).toString();
}


function encryptRSA(data) {
    const crypt = new Crypt();
    return crypt.encrypt(credentials["publicKey"], data);
}

function decryptRSA(encode) {
    const crypt = new Crypt();
    return crypt.decrypt(credentials["privateKey"], encode);
}

function encryptAES(data, secretKey) {
    return crypto.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

function decryptAES(encode, secretKey) {
    let bytes = crypto.AES.decrypt(encode, secretKey);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
}

// Hash email using md5
function hashMD5(email) {
    return crypto.HmacMD5(email).toString();
}

export { hashBcrypt, hashSHA256, hashMD5, encryptAES, decryptAES, encryptRSA, decryptRSA}