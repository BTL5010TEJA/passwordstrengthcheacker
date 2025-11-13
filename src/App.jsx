import React, { useState } from 'react';
import PasswordChecker from './components/PasswordChecker';
import PasswordGenerator from './components/PasswordGenerator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('checker');

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-lg bg-white/10 backdrop-blur-sm p-1">
            <button
              onClick={() => setActiveTab('checker')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'checker'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Password Checker
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'generator'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Password Generator
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="animate-slideIn">
          {activeTab === 'checker' ? <PasswordChecker /> : <PasswordGenerator />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
