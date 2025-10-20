import CryptoJS from 'crypto-js';

// ========================================
// 설정값
// ========================================
// accessKey: IV(Initialization Vector) 생성에 사용되는 키
// seedKey: 실제 AES 암호화/복호화에 사용되는 비밀키 (Base64 인코딩된 32바이트 = 256비트)
const accessKey = 'kR8vZ2nP9xQ5mL3hF7jK1dS6wE4tY0uI2oA8cB5gH9v=';
const seedKey = '8MpaHtB0/D54GlNuo8Tk+B1+fObDUPGc071tfny2nVU=';

// ========================================
// IV(Initialization Vector) 생성 함수
// ========================================
/**
 * IV란?
 * - AES CBC 모드에서 암호화의 초기값으로 사용
 * - 같은 평문이라도 IV가 다르면 다른 암호문이 생성됨 (보안성 향상)
 * - 16바이트(128비트) 길이 필요
 *
 * 이 함수의 로직:
 * 1. timestamp + key 문자열을 결합
 * 2. SHA-256 해시 생성 (32바이트 = 256비트)
 * 3. 앞쪽 16바이트만 잘라서 IV로 사용
 */
export function generateIv(timestamp: string, key: string) {
  // 1. timestamp와 key를 결합한 문자열 생성
  // 예: "1760607802106" + "kR8vZ2nP9..." = "1760607802106kR8vZ2nP9..."
  const dataToHash = timestamp + key;

  // 2. SHA-256 해시 생성
  // SHA-256: 어떤 길이의 입력이든 항상 256비트(32바이트) 출력을 생성하는 해시 함수
  // CryptoJS.SHA256()은 문자열을 자동으로 UTF-8로 인코딩하여 처리
  const hash = CryptoJS.SHA256(dataToHash);

  // 3. 해시의 앞 16바이트(4 words)만 추출
  // CryptoJS에서 1 word = 4 bytes
  // IV는 16바이트 필요 → 4 words 필요
  // hash.words는 배열이고, slice(0, 4)로 앞 4개 요소만 가져옴
  return CryptoJS.lib.WordArray.create(hash.words.slice(0, 4), 16);
}

// ========================================
// AES-256 암호화 함수
// ========================================
/**
 * AES-256 CBC 모드로 평문을 암호화
 *
 * @param requestTime - 요청 시각 (밀리초 단위 timestamp)
 * @param lvKey - IV 생성에 사용할 키 (accessKey)
 * @param plainText - 암호화할 평문 (예: 전화번호)
 * @returns Base64로 인코딩된 암호문
 */
export function encryptAes256(
  requestTime: string,
  lvKey: string,
  plainText: string
) {
  // 1. IV 생성 (timestamp + accessKey 조합으로)
  const iv = generateIv(requestTime, lvKey);

  // 2. seedKey를 WordArray로 변환 (AES 키로 사용하기 위해)
  const keyWA = getKeyWordArray(seedKey);
  // console.log(keyWA)
  // 3. 평문을 UTF-8로 인코딩된 WordArray로 변환
  // "01071903812" → UTF-8 바이트 배열로 변환
  // const pt = CryptoJS.enc.Utf8.parse(plainText);
  // console.log('pt 콘솔콘솔솔', pt)
  // 4. AES 암호화 수행
  // const encrypted = CryptoJS.AES.encrypt(pt, keyWA, {
  //   iv,                           // IV (16바이트)
  //   mode: CryptoJS.mode.CBC,      // CBC 모드: 이전 블록의 암호문이 다음 블록에 영향
  //   padding: CryptoJS.pad.Pkcs7,  // PKCS7 패딩: 블록 크기에 맞추기 위한 패딩
  // });
  // console.log('encrypted' , encrypted)

  // 4. AES 암호화 수행 (간소화.ver)
  const encrypted = CryptoJS.AES.encrypt(plainText, keyWA, { iv });

  // 5. 암호화된 바이너리 데이터를 Base64 문자열로 변환
  // ciphertext: 실제 암호화된 바이트 데이터
  // Base64: 바이너리 데이터를 텍스트로 안전하게 전송하기 위한 인코딩
  const res = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return res;
}

// ========================================
// AES-256 복호화 함수
// ========================================
/**
 * AES-256 CBC 모드로 암호문을 복호화
 *
 * @param requestTime - 암호화할 때 사용한 timestamp (동일해야 함!)
 * @param lvKey - 암호화할 때 사용한 키 (accessKey)
 * @param cipherTextBase64 - Base64로 인코딩된 암호문
 * @returns 복호화된 평문
 */
export function decryptAes256(
  requestTime: string,
  lvKey: string,
  cipherTextBase64: string
) {
  // 1. IV 생성 (암호화할 때와 동일한 방식으로)
  // ⚠️ 중요: timestamp가 암호화할 때와 같아야 함!
  const iv = generateIv(requestTime, lvKey);

  // 2. seedKey를 WordArray로 변환
  const keyWA = getKeyWordArray(seedKey);

  // 3. Base64 암호문을 바이너리로 파싱
  // CipherParams 객체 생성: CryptoJS가 올바르게 처리하도록
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherTextBase64),
  });

  // 4. AES 복호화 수행
  const decrypted = CryptoJS.AES.decrypt(cipherParams, keyWA, {
    iv, // 암호화할 때 사용한 것과 동일한 IV
    // mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7,
  });

  // 5. 복호화된 바이트를 UTF-8 문자열로 변환
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

// ========================================
// Base64 키를 WordArray로 변환하는 헬퍼 함수
// ========================================
/**
 * Base64로 인코딩된 seedKey를 CryptoJS가 사용할 수 있는 형태로 변환
 *
 * @param base64Key - Base64 인코딩된 32바이트 키
 * @returns WordArray 형태의 키
 */
function getKeyWordArray(base64Key: string) {
  // Base64 문자열을 디코딩하여 바이너리 데이터(WordArray)로 변환
  const wa = CryptoJS.enc.Base64.parse(base64Key);

  // AES-256은 256비트(32바이트) 키가 필요
  // sigBytes: 실제 바이트 수
  if (wa.sigBytes !== 32) {
    throw new Error('seedKey must be 32 bytes (256-bit) in Base64.');
  }

  return wa;
  // return base64Key;
}

// ========================================
// 테스트 코드
// ========================================
// 고정된 timestamp 사용 (디버깅 목적)
// 실제 사용 시에는 Date.now()로 현재 시각 사용
// const timestamp = String(1760607802106);
const timestamp = 'long';

// 1. 암호화 테스트
const encryptedData = encryptAes256(timestamp, accessKey, '01071903812');
console.log('encryptedData: ', encryptedData);

// 2. 복호화 테스트 (로컬에서 확인용)
const decryptedData = decryptAes256(timestamp, accessKey, encryptedData);
console.log('decryptedData: ', decryptedData);

// ========================================
// API 요청
// ========================================
/**
 * 백엔드로 암호화된 전화번호 전송
 *
 * ⚠️ 중요 포인트:
 * 1. X-Timestamp 헤더: 백엔드가 이 값으로 IV를 생성하여 복호화
 * 2. 프론트와 백엔드의 timestamp가 정확히 일치해야 복호화 가능
 * 3. accessKey와 seedKey도 양쪽이 동일해야 함
 */
const res = await fetch(
  'http://dev-hitup.link:27000/api/v1/authentication/client/register',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "X-Timestamp": timestamp,   // 백엔드가 복호화에 사용할 timestamp
      'request-time': timestamp,
    },
    body: JSON.stringify({
      phoneNumber: encryptedData, // Base64로 인코딩된 암호화된 전화번호
    }),
  }
);

const result = await res.json();
console.log(result);
