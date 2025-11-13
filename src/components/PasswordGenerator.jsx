import React, { useState, useEffect } from 'react';
import { generatePassword, generatePassphrase, copyToClipboard } from '../utils/passwordGenerator';
import { analyzePassword, getStrengthColor } from '../utils/passwordAnalysis';

function PasswordGenerator() {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordType, setPasswordType] = useState('random'); // 'random' or 'passphrase'
  const [copied, setCopied] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  // Random password options
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  // Passphrase options
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [capitalize, setCapitalize] = useState(true);
  const [includeNumbersInPhrase, setIncludeNumbersInPhrase] = useState(false);

  useEffect(() => {
    if (generatedPassword) {
      const result = analyzePassword(generatedPassword);
      setAnalysis(result);
    }
  }, [generatedPassword]);

  const handleGenerate = () => {
    let password;
    if (passwordType === 'random') {
      password = generatePassword({
        length,
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSpecialChars,
        excludeSimilar,
        excludeAmbiguous,
      });
    } else {
      password = generatePassphrase(wordCount, separator, capitalize, includeNumbersInPhrase);
    }
    setGeneratedPassword(password);
    setCopied(false);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedPassword);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Generator Settings */}
        <div className="space-y-6">
          {/* Password Type Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Password Type</h2>
            
            <div className="flex gap-4">
              <button
                onClick={() => setPasswordType('random')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  passwordType === 'random'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Random Password
              </button>
              <button
                onClick={() => setPasswordType('passphrase')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  passwordType === 'passphrase'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Passphrase
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Options</h2>

            {passwordType === 'random' ? (
              <div className="space-y-4">
                {/* Length Slider */}
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Length: {length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Character Type Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white">Lowercase (a-z)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white">Uppercase (A-Z)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white">Numbers (0-9)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSpecialChars}
                      onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white">Special Characters (!@#$...)</span>
                  </label>
                </div>

                {/* Advanced Options */}
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeSimilar}
                      onChange={(e) => setExcludeSimilar(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white text-sm">Exclude Similar (i, l, 1, L, o, 0, O)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeAmbiguous}
                      onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white text-sm">Exclude Ambiguous ({'{}[]()...'})</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Word Count */}
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Number of Words: {wordCount}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Separator */}
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Separator
                  </label>
                  <input
                    type="text"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    maxLength="3"
                    className="w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60"
                  />
                </div>

                {/* Passphrase Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={capitalize}
                      onChange={(e) => setCapitalize(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white">Capitalize Words</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNumbersInPhrase}
                      onChange={(e) => setIncludeNumbersInPhrase(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/30 bg-white/20 checked:bg-blue-500"
                    />
                    <span className="text-white">Include Number at End</span>
                  </label>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Generate New Password
            </button>
          </div>
        </div>

        {/* Right Panel - Generated Password */}
        <div className="space-y-6">
          {/* Generated Password Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Generated Password</h2>

            <div className="bg-white/20 rounded-xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white text-xl font-mono break-all flex-1">
                  {generatedPassword || 'Click generate to create a password'}
                </p>
                
                {generatedPassword && (
                  <button
                    onClick={handleCopy}
                    className="ml-4 p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>

              {copied && (
                <p className="text-green-400 text-sm font-semibold animate-pulse">
                  ✓ Copied to clipboard!
                </p>
              )}
            </div>

            {/* Strength Analysis */}
            {analysis && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-medium">Strength:</span>
                  <span className={`${getStrengthColor(analysis.score).text} font-bold text-lg`}>
                    {analysis.strength}
                  </span>
                </div>

                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor(analysis.score).bg} transition-all duration-500`}
                    style={{ width: `${(analysis.score / 4) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white/60 text-sm">Length</p>
                    <p className="text-white font-semibold">{analysis.metrics.length}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white/60 text-sm">Entropy</p>
                    <p className="text-white font-semibold">{analysis.metrics.entropy} bits</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white/60 text-sm">Crack Time</p>
                    <p className="text-white font-semibold text-xs">{analysis.crackTime}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white/60 text-sm">Score</p>
                    <p className="text-white font-semibold">{analysis.score}/4</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">💡 Tips</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Random passwords are stronger but harder to remember</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Passphrases are easier to remember and can be very secure</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use a password manager to store your passwords securely</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Never reuse passwords across different accounts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Longer passwords are exponentially more secure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
