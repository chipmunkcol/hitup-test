/**
 * AES-256-CBC 암호화 (브라우저/Web Crypto)
 * - 자바 백엔드 로직과 1:1 매칭:
 *   - Cipher: "AES/CBC/PKCS5Padding"  (Web Crypto의 "AES-CBC"는 PKCS#7=PKCS#5Padding과 동일)
 *   - SecretKey: Base64로 전달된 32바이트(256bit) 키(raw) 사용 (Java의 getSecretKeyFromBase64와 동일 개념)
 *   - IV: SHA-256( requestTime + lvKey ) 결과의 앞 16바이트 (Java의 generateIv와 동일)
 *   - 출력: Base64(ciphertext)  (Java의 Base64 인코딩과 동일)
 *
 * @param requestTime   자바에서 System.currentTimeMillis()로 만든 값의 문자열 (예: "1729140212345")
 * @param lvKey         IV 생성에 쓰는 키 문자열 (백엔드의 applicationConfig.getAccessKey())
 * @param plainText     암호화할 평문 데이터 (예: 전화번호 "01071903812")
 * @param secretKeyB64  AES-256 키의 Base64 문자열 (백엔드의 seedKey와 동일한 값)
 * @returns             Base64 인코딩된 암호문
 *
 * ✅ 중요 포인트
 * 1) requestTime은 문자열 그대로 해시해야 Java와 IV가 일치합니다. (숫자→문자열 변환 차이 주의)
 * 2) secretKeyB64는 32바이트(raw) 키가 Base64로 인코딩된 값이어야 합니다.
 * 3) atob/btoa는 브라우저 내장입니다. (Node 환경이면 Buffer로 대체 필요)
 * 4) Web Crypto는 비동기이므로 함수는 async입니다.
 */
export async function encryptAes256(
  requestTime: string,
  lvKey: string,
  plainText: string,
  secretKeyB64: string
): Promise<string> {
  // 1) IV 생성: SHA-256( requestTime + lvKey ) → 앞 16바이트
  const iv = await generateIvFromTimestampAndKey(requestTime, lvKey);

  // 2) Base64(AES 키) → raw 키 바이트 → Web Crypto용 CryptoKey로 import
  const keyRaw = base64ToUint8Array(secretKeyB64);
  if (keyRaw.byteLength !== 32) {
    throw new Error(
      `Invalid AES key length: ${keyRaw.byteLength} bytes. Expected 32 bytes for AES-256.`
    );
  }

  const cryptoKey = await crypto.subtle.importKey(
    'raw', // Java의 SecretKeySpec과 유사: raw 바이트 키
    keyRaw,
    { name: 'AES-CBC' },
    false, // extractable: false (키 추출 금지)
    ['encrypt'] // 용도: 암호화
  );

  // 3) 평문 → UTF-8 바이트
  const encoder = new TextEncoder();
  const plaintextBytes = encoder.encode(plainText);

  // 4) AES-256-CBC 암호화 (PKCS#5/7 패딩은 Web Crypto가 자동 처리)
  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    cryptoKey,
    plaintextBytes
  );

  // 5) 암호문(ArrayBuffer) → Base64 문자열 (자바의 Base64와 동일 포맷)
  const ciphertextB64 = arrayBufferToBase64(ciphertextBuffer);
  return ciphertextB64;
}

/**
 * 자바의 generateIv(timestamp, key)와 동일:
 *   SHA-256( timestamp + key ) → 앞 16바이트(128bit) 사용
 */
async function generateIvFromTimestampAndKey(
  timestamp: string,
  key: string
): Promise<Uint8Array> {
  const data = new TextEncoder().encode(timestamp + key);
  const hash = await crypto.subtle.digest('SHA-256', data); // 32바이트
  return new Uint8Array(hash).slice(0, 16); // 앞 16바이트 = IV
}

/** Base64 → Uint8Array (브라우저 atob 사용) */
function base64ToUint8Array(b64: string): Uint8Array {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** ArrayBuffer → Base64 (브라우저 btoa 사용) */
function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++)
    binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

// const requestTime = String(Date.now()); // 자바와 동일하게 "문자열"로 보냄
const requestTime = String(1760607802106);

(async () => {
  // const lvKey = import.meta.env.VITE_ACCESS_KEY; // 백엔드의 applicationConfig.getAccessKey()
  // const secretKeyB64 = import.meta.env.VITE_SEED_KEY; // 백엔드의 seedKey (Base64)와 동일해야 함
  const lvKey = 'kR8vZ2nP9xQ5mL3hF7jK1dS6wE4tY0uI2oA8cB5gH9v=';
  const secretKeyB64 = '8MpaHtB0/D54GlNuo8Tk+B1+fObDUPGc071tfny2nVU=';
  const phoneNumber = '01071903812';

  const enc = await encryptAes256(
    requestTime,
    lvKey,
    phoneNumber,
    secretKeyB64
  );
  // enc를 백엔드로 전송하고, 백엔드는 같은 requestTime, lvKey로 IV를 만들고
  // 동일한 secretKey(Base64)를 사용해 복호화하면 원문이 나옵니다.
  console.log(enc);
})();

/* ========================= 사용 예시 =========================
(async () => {
  const requestTime = String(Date.now());           // 자바와 동일하게 "문자열"로 보냄
  const lvKey = "YOUR_ACCESS_KEY_FROM_CONFIG";      // 백엔드의 applicationConfig.getAccessKey()
  const secretKeyB64 = "YOUR_256BIT_KEY_IN_BASE64"; // 백엔드의 seedKey (Base64)와 동일해야 함
  const phoneNumber = "01071903812";

  const enc = await encryptAes256(requestTime, lvKey, phoneNumber, secretKeyB64);
  // enc를 백엔드로 전송하고, 백엔드는 같은 requestTime, lvKey로 IV를 만들고
  // 동일한 secretKey(Base64)를 사용해 복호화하면 원문이 나옵니다.
  console.log(enc);
})();
============================================================= */
