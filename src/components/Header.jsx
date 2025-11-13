import React from 'react';

function Header() {
  return (
    <header className="w-full bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">
            🔐 Password Strength Checker
          </h1>
          <p className="text-white/80 text-center text-lg">
            Advanced security analysis powered by AI
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
