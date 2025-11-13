import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-white/10 backdrop-blur-md border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/80 text-center md:text-left">
            <p className="font-semibold">Password Strength Checker</p>
            <p className="text-sm">© {currentYear} Teja Lakshman. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6 text-white/80">
            <a
              href="https://github.com/BTL5010TEJA/passwordstrengthcheacker"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-white/60">|</span>
            <p className="text-sm">
              Secure password analysis with zxcvbn
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center text-white/60 text-sm">
          <p>⚠️ Your passwords are analyzed locally in your browser and are never sent to any server.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
