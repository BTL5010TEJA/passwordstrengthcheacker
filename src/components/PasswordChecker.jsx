import React, { useState, useEffect } from 'react';
import { analyzePassword, getStrengthColor, getStrengthPercentage, checkBreachWarning } from '../utils/passwordAnalysis';
import StrengthMeter from './StrengthMeter';
import PasswordInput from './PasswordInput';
import FeedbackPanel from './FeedbackPanel';
import PasswordVisualization from './PasswordVisualization';

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [breachWarning, setBreachWarning] = useState(false);

  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setAnalysis(result);
      setBreachWarning(checkBreachWarning(password));
    } else {
      setAnalysis(null);
      setBreachWarning(false);
    }
  }, [password]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearPassword = () => {
    setPassword('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Input and Analysis */}
        <div className="space-y-6">
          {/* Password Input Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Enter Your Password
            </h2>
            
            <PasswordInput
              password={password}
              showPassword={showPassword}
              onPasswordChange={handlePasswordChange}
              onToggleShow={toggleShowPassword}
              onClear={clearPassword}
            />

            {breachWarning && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  This password appears in common breach databases. Please use a different password.
                </p>
              </div>
            )}
          </div>

          {/* Strength Meter */}
          {analysis && (
            <StrengthMeter
              score={analysis.score}
              strength={analysis.strength}
              percentage={getStrengthPercentage(analysis.score)}
              colors={getStrengthColor(analysis.score)}
            />
          )}

          {/* Feedback Panel */}
          {analysis && (
            <FeedbackPanel
              analysis={analysis}
              colors={getStrengthColor(analysis.score)}
            />
          )}
        </div>

        {/* Right Panel - 3D Visualization */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Security Visualization
            </h2>
            <PasswordVisualization 
              score={analysis?.score || 0}
              password={password}
            />
          </div>

          {/* Quick Tips */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">💡 Quick Tips</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Use at least 12 characters for better security</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Mix uppercase, lowercase, numbers, and symbols</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Avoid common words and personal information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Use unique passwords for different accounts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Consider using a password manager</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChecker;
