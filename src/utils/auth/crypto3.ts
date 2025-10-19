import CryptoJS from 'crypto-js'

const secretKey = 'secretkey'

const encryptData = () => {
  const hash = CryptoJS.AES.encrypt(JSON.stringify({ name:'jack', age:27 }), secretKey).toString()
  console.log('암호화', hash)
  return hash
}

const encrytedData = encryptData();

const decryptData = (hash, scretKey) => {
  const bytes = CryptoJS.AES.decrypt(hash, scretKey);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  console.log('복호화', decrypted)
};

decryptData(encrytedData, secretKey);