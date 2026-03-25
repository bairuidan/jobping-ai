import CryptoJS from 'crypto-js';

const SECRET = 'jobping-ai-local-secret';
const STORAGE_KEY = 'jobping_deepseek_key';

export function saveEncryptedKey(apiKey: string) {
  const encrypted = CryptoJS.AES.encrypt(apiKey, SECRET).toString();
  localStorage.setItem(STORAGE_KEY, encrypted);
}

export function getDecryptedKey() {
  const encrypted = localStorage.getItem(STORAGE_KEY);
  if (!encrypted) return '';
  try {
    return CryptoJS.AES.decrypt(encrypted, SECRET).toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
}
