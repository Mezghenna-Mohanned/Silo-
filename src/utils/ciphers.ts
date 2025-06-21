// Caesar Cipher
export const caesarEncode = (text: string, shift: number): string => {
  return text.replace(/[A-Za-z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

export const caesarDecode = (text: string, shift: number): string => {
  return caesarEncode(text, 26 - shift);
};

// Atbash Cipher
export const atbashEncode = (text: string): string => {
  return text.replace(/[A-Za-z]/g, (char) => {
    if (char <= 'Z') {
      return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
    } else {
      return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
    }
  });
};

// Base64
export const base64Encode = (text: string): string => {
  return btoa(text);
};

export const base64Decode = (text: string): string => {
  try {
    return atob(text);
  } catch {
    return '';
  }
};

// Hex encoding
export const hexEncode = (text: string): string => {
  return text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
};

export const hexDecode = (hex: string): string => {
  try {
    return hex.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || '';
  } catch {
    return '';
  }
};

// XOR Cipher
export const xorEncode = (text: string, key: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
};

// Simple substitution cipher
export const substitutionEncode = (text: string, key: { [key: string]: string }): string => {
  return text.split('').map(char => key[char.toLowerCase()] || char).join('');
};

export const substitutionDecode = (text: string, key: { [key: string]: string }): string => {
  const reverseKey: { [key: string]: string } = {};
  Object.entries(key).forEach(([k, v]) => {
    reverseKey[v] = k;
  });
  return text.split('').map(char => reverseKey[char.toLowerCase()] || char).join('');
};

// Vigenère Cipher
export const vigenereEncode = (text: string, key: string): string => {
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Za-z]/.test(char)) {
      const start = char <= 'Z' ? 65 : 97;
      const shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
      result += String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
};

export const vigenereDecode = (text: string, key: string): string => {
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[A-Za-z]/.test(char)) {
      const start = char <= 'Z' ? 65 : 97;
      const shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
      result += String.fromCharCode(((char.charCodeAt(0) - start - shift + 26) % 26) + start);
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
};