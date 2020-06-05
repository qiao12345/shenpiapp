import CryptoJS from 'crypto-js'

export const encryptCBC = (text, textKey) => {
  // 密钥转成16进制的字符串
  var key = CryptoJS.enc.Utf8.parse(textKey);
  // 加密过程
  var encrypted = CryptoJS.DES.encrypt(text, key, {
    // iv偏移量为key值
    iv: key,
    // 模式为CBC
    mode: CryptoJS.mode.CBC,
    // DES加密padding为Pkcs7
    padding: CryptoJS.pad.Pkcs7
  });
  // 加密返回为字符串密文(加密经过一次base64加密，结果可看结果)
  return encrypted.toString();
}

// 解密
export const decryptCBC = (cipherText, textKey) => {
  var key = CryptoJS.enc.Utf8.parse(textKey);
  var decrypt = CryptoJS.DES.decrypt(cipherText, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // 解密返回转为UTF-8明文(解密也经过一次base64解密)
  return decrypt.toString(CryptoJS.enc.Utf8);
}