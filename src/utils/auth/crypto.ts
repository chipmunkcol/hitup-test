import CryptoJS from 'crypto-js';

const accessKey = 'kR8vZ2nP9xQ5mL3hF7jK1dS6wE4tY0uI2oA8cB5gH9v=';
const seedKey = '8MpaHtB0/D54GlNuo8Tk+B1+fObDUPGc071tfny2nVU=';

// const accessKey = 'test';
// const seedKey = 'test';

// IV 생성 (timestamp + key)
export function generateIv(timestamp: number, key: string) {
  const ts = String(timestamp);
  const data = CryptoJS.enc.Utf8.parse(ts + key);
  const hash = CryptoJS.SHA256(data);
  // 앞 16바이트만 사용 (4 words = 16 bytes). sigBytes를 16으로 명시!
  return CryptoJS.lib.WordArray.create(hash.words.slice(0, 4), 16);
}

export function encryptAes256(
  requestTime: number,
  lvKey: string,
  plainText: string
) {
  const iv = generateIv(requestTime, lvKey);
  const keyWA = getKeyWordArray(seedKey);
  const pt = CryptoJS.enc.Utf8.parse(plainText);

  const encrypted = CryptoJS.AES.encrypt(pt, keyWA, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Java: Base64.getEncoder().encodeToString(encryptedBytes) 과 동일
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export function decryptAes256(
  requestTime: number,
  lvKey: string,
  cipherTextBase64: string
) {
  const iv = generateIv(requestTime, lvKey);
  const keyWA = getKeyWordArray(seedKey);

  // 문자열을 그대로 넘기면 OpenSSL 포맷으로 처리될 수 있으므로 CipherParams로 전달
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherTextBase64),
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, keyWA, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return CryptoJS.enc.Utf8.stringify(decrypted);
}

function getKeyWordArray(base64Key: string) {
  // 자바의 getSecretKeyFromBase64 와 동일한 역할
  const wa = CryptoJS.enc.Base64.parse(base64Key);
  if (wa.sigBytes !== 32) {
    // 256-bit(AES-256) 체크
    throw new Error('seedKey must be 32 bytes (256-bit) in Base64.');
  }
  return wa;
}

// const timestamp = Date.now();
const timestamp = 1760607802106;

const encryptedData = encryptAes256(timestamp, accessKey, '01071903812');
console.log('encryptedData: ', encryptedData);

const decryptedData = decryptAes256(timestamp, accessKey, encryptedData);
console.log('decryptedData: ', decryptedData);
