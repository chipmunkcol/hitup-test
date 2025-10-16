public void testEncryptRequest() throws Exception { 
  String phoneNumber = "01071903812"; 
  long currentTimeMillis = System.currentTimeMillis(); 
  String timeString = String.valueOf(currentTimeMillis); 
  String encryptData = SecurityUtils.encryptAes256(timeString, applicationConfig.getAccessKey(), phoneNumber); 
  String decryptData = SecurityUtils.decryptAes256(timeString, applicationConfig.getAccessKey(), encryptData); 
  String s = ""; System.out.println(decryptData); 
} 

public static String encryptAes256(String requestTime, String lvKey, String encryptData) { 
  try { 
    byte[] ivBytesServer = CryptoAes256Utils.generateIv(requestTime, lvKey); 
    return CryptoAes256Utils.encrypt(encryptData, seedKey, ivBytesServer); 
  } catch (Exception ex) { 
    Log.error("SecurityUtils.encryptAes256 비밀번호 암호화 실패"); 
    return ""; 
  } 
} 

public static byte[] generateIv(String timestamp, String key) throws NoSuchAlgorithmException { 
  String dataToHash = timestamp + key; 
  MessageDigest digest = MessageDigest.getInstance("SHA-256"); 
  byte[] hashBytes = digest.digest(dataToHash.getBytes(StandardCharsets.UTF_8)); 
  return Arrays.copyOfRange(hashBytes, 0, 16); 
} 

public static String encrypt(String plainText, String secretKeyBase64, byte[] ivBytes) throws Exception { 
  SecretKey secretKey = getSecretKeyFromBase64(secretKeyBase64); 
  IvParameterSpec ivParameterSpec = new IvParameterSpec(ivBytes); 
  Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding"); 
  cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParameterSpec); 
  byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8)); 
  return Base64.getEncoder().encodeToString(encryptedBytes); 
}