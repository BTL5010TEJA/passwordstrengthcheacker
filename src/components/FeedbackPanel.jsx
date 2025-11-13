import React from 'react';

function FeedbackPanel({ analysis, colors }) {
  const { feedback, crackTime, metrics, guesses } = analysis;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-6">Detailed Analysis</h3>

      {/* Crack Time */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 font-medium">Time to Crack:</span>
          <span className={`${colors.text} font-bold`}>{crackTime}</span>
        </div>
        <div className="text-white/60 text-sm">
          Estimated time for a hacker to crack this password
        </div>
      </div>

      {/* Password Metrics */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Password Composition</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metrics.hasLowercase ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-white/80 text-sm">Lowercase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metrics.hasUppercase ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-white/80 text-sm">Uppercase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metrics.hasNumbers ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-white/80 text-sm">Numbers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metrics.hasSpecialChars ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-white/80 text-sm">Special Chars</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-white/80">
          <span>Length:</span>
          <span className="font-semibold">{metrics.length} characters</span>
        </div>
        <div className="flex justify-between text-white/80">
          <span>Entropy:</span>
          <span className="font-semibold">{metrics.entropy} bits</span>
        </div>
        <div className="flex justify-between text-white/80">
          <span>Possible Guesses:</span>
          <span className="font-semibold">{guesses.toExponential(2)}</span>
        </div>
      </div>

      {/* Feedback */}
      {(feedback.warning || feedback.suggestions.length > 0) && (
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Suggestions</h4>
          
          {feedback.warning && (
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-200 text-sm">⚠️ {feedback.warning}</p>
            </div>
          )}

          {feedback.suggestions.length > 0 && (
            <ul className="space-y-2">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedbackPanel;
