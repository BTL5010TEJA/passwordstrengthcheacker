/**
 * Generates a random password based on provided options
 * @param {object} options - Password generation options
 * @returns {string} - Generated password
 */
export const generatePassword = (options) => {
  const {
    length = 16,
    includeLowercase = true,
    includeUppercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
    excludeSimilar = false,
    excludeAmbiguous = false
  } = options;

  let charset = '';
  
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const similar = 'il1Lo0O';
  const ambiguous = '{}[]()/\\\'"`~,;:.<>';
  
  if (includeLowercase) {
    charset += lowercase;
  }
  if (includeUppercase) {
    charset += uppercase;
  }
  if (includeNumbers) {
    charset += numbers;
  }
  if (includeSpecialChars) {
    charset += specialChars;
  }
  
  if (excludeSimilar) {
    charset = charset.split('').filter(char => !similar.includes(char)).join('');
  }
  
  if (excludeAmbiguous) {
    charset = charset.split('').filter(char => !ambiguous.includes(char)).join('');
  }
  
  if (charset.length === 0) {
    return '';
  }
  
  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  
  // Ensure at least one character from each selected category
  if (includeLowercase && !/[a-z]/.test(password)) {
    password = replaceRandomChar(password, lowercase);
  }
  if (includeUppercase && !/[A-Z]/.test(password)) {
    password = replaceRandomChar(password, uppercase);
  }
  if (includeNumbers && !/[0-9]/.test(password)) {
    password = replaceRandomChar(password, numbers);
  }
  if (includeSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    password = replaceRandomChar(password, specialChars);
  }
  
  return password;
};

/**
 * Replaces a random character in the password with one from the given charset
 * @param {string} password - Current password
 * @param {string} charset - Character set to choose from
 * @returns {string} - Modified password
 */
const replaceRandomChar = (password, charset) => {
  const pos = Math.floor(Math.random() * password.length);
  const newChar = charset[Math.floor(Math.random() * charset.length)];
  return password.substring(0, pos) + newChar + password.substring(pos + 1);
};

/**
 * Generates a memorable passphrase
 * @param {number} wordCount - Number of words in the passphrase
 * @param {string} separator - Separator between words
 * @param {boolean} capitalize - Whether to capitalize words
 * @param {boolean} includeNumbers - Whether to include numbers
 * @returns {string} - Generated passphrase
 */
export const generatePassphrase = (wordCount = 4, separator = '-', capitalize = true, includeNumbers = false) => {
  const wordList = [
    'correct', 'horse', 'battery', 'staple', 'planet', 'ocean', 'mountain', 'river',
    'forest', 'desert', 'island', 'valley', 'canyon', 'glacier', 'volcano', 'meadow',
    'garden', 'flower', 'sunset', 'sunrise', 'rainbow', 'thunder', 'lightning', 'breeze',
    'whisper', 'echo', 'shadow', 'crystal', 'diamond', 'golden', 'silver', 'bronze',
    'dragon', 'phoenix', 'griffin', 'unicorn', 'tiger', 'eagle', 'falcon', 'panther',
    'wisdom', 'courage', 'honor', 'justice', 'freedom', 'peace', 'harmony', 'balance',
    'journey', 'adventure', 'quest', 'treasure', 'mystery', 'legend', 'story', 'dream',
    'magic', 'wonder', 'spark', 'flame', 'storm', 'tide', 'wave', 'wind',
    'cloud', 'star', 'moon', 'sun', 'comet', 'nova', 'cosmos', 'galaxy'
  ];
  
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    if (includeNumbers && i === wordCount - 1) {
      word += Math.floor(Math.random() * 100);
    }
    words.push(word);
  }
  
  return words.join(separator);
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
