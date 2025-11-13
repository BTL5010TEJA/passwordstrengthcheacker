import zxcvbn from 'zxcvbn';

/**
 * Analyzes password strength using zxcvbn library
 * @param {string} password - The password to analyze
 * @returns {object} - Analysis results including score, feedback, and metrics
 */
export const analyzePassword = (password) => {
  if (!password) {
    return {
      score: 0,
      strength: 'Empty',
      feedback: {
        warning: 'Please enter a password',
        suggestions: ['Password cannot be empty']
      },
      crackTime: '0 seconds',
      metrics: {
        length: 0,
        hasLowercase: false,
        hasUppercase: false,
        hasNumbers: false,
        hasSpecialChars: false,
        entropy: 0
      }
    };
  }

  const result = zxcvbn(password);
  
  // Calculate additional metrics
  const metrics = {
    length: password.length,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    entropy: calculateEntropy(password)
  };

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strength = strengthLabels[result.score];

  return {
    score: result.score,
    strength,
    feedback: result.feedback,
    crackTime: formatCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second),
    crackTimeSeconds: result.crack_times_seconds.offline_slow_hashing_1e4_per_second,
    metrics,
    guesses: result.guesses,
    guessesLog10: result.guesses_log10
  };
};

/**
 * Calculates the Shannon entropy of a password
 * @param {string} password - The password to analyze
 * @returns {number} - Entropy value
 */
const calculateEntropy = (password) => {
  const charSet = new Set(password);
  const length = password.length;
  
  if (length === 0) return 0;
  
  const frequencies = {};
  for (const char of password) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  
  let entropy = 0;
  for (const char in frequencies) {
    const probability = frequencies[char] / length;
    entropy -= probability * Math.log2(probability);
  }
  
  return Math.round(entropy * length * 10) / 10;
};

/**
 * Formats crack time into a human-readable string
 * @param {string} crackTime - Raw crack time string
 * @returns {string} - Formatted crack time
 */
const formatCrackTime = (crackTime) => {
  return crackTime || 'instantly';
};

/**
 * Generates strength color based on score
 * @param {number} score - Password strength score (0-4)
 * @returns {object} - Color classes for different UI elements
 */
export const getStrengthColor = (score) => {
  const colors = {
    0: {
      bg: 'bg-red-500',
      text: 'text-red-500',
      border: 'border-red-500',
      gradient: 'from-red-500 to-red-700'
    },
    1: {
      bg: 'bg-orange-500',
      text: 'text-orange-500',
      border: 'border-orange-500',
      gradient: 'from-orange-500 to-orange-700'
    },
    2: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-500',
      border: 'border-yellow-500',
      gradient: 'from-yellow-500 to-yellow-700'
    },
    3: {
      bg: 'bg-blue-500',
      text: 'text-blue-500',
      border: 'border-blue-500',
      gradient: 'from-blue-500 to-blue-700'
    },
    4: {
      bg: 'bg-green-500',
      text: 'text-green-500',
      border: 'border-green-500',
      gradient: 'from-green-500 to-green-700'
    }
  };
  
  return colors[score] || colors[0];
};

/**
 * Checks if password has been in a common breach (simplified check)
 * In production, this would call an API like HaveIBeenPwned
 * @param {string} password - The password to check
 * @returns {boolean} - Whether the password appears to be common/breached
 */
export const checkBreachWarning = (password) => {
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
    'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
    'bailey', 'passw0rd', 'shadow', '123123', '654321'
  ];
  
  return commonPasswords.includes(password.toLowerCase());
};

/**
 * Get password strength percentage for progress bar
 * @param {number} score - Password strength score (0-4)
 * @returns {number} - Percentage value
 */
export const getStrengthPercentage = (score) => {
  return (score / 4) * 100;
};
