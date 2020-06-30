const CryptoJS = require('crypto-js');
module.exports = {
    SECRET : 'comoestaskey',

    enc(plainText){
        var b64 = CryptoJS.AES.encrypt(plainText, this.SECRET).toString();
        var e64 = CryptoJS.enc.Base64.parse(b64);
        var eHex = e64.toString(CryptoJS.enc.Hex);
        return eHex;
    },

    dec(cipherText){
        var reb64 = CryptoJS.enc.Hex.parse(cipherText);
        var bytes = reb64.toString(CryptoJS.enc.Base64);
        var decrypt = CryptoJS.AES.decrypt(bytes, this.SECRET);
        var plain = decrypt.toString(CryptoJS.enc.Utf8);
        return plain;
    }

}