import React from 'react';

function StrengthMeter({ score, strength, percentage, colors }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Password Strength</h3>
      
      <div className="space-y-4">
        {/* Strength Label */}
        <div className="flex items-center justify-between">
          <span className="text-white/80 font-medium">Strength Level:</span>
          <span className={`${colors.text} font-bold text-lg`}>{strength}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.bg} transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Score Indicators */}
        <div className="flex justify-between items-center">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-1/6 h-2 rounded-full mx-1 transition-all duration-300 ${
                level <= score ? colors.bg : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Score Text */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Score: {score} / 4 ({Math.round(percentage)}%)
          </p>
        </div>
      </div>
    </div>
  );
}

export default StrengthMeter;
