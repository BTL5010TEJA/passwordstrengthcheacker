# 🔐 Password Strength Checker

**Author:** Teja Lakshman

An advanced, interactive password strength checker and generator built with React, Three.js, and powered by the industry-standard zxcvbn library. This application provides real-time password analysis, 3D visualizations, and intelligent password generation to help users create and evaluate secure passwords.

## ✨ Features

### Password Strength Checker
- **Real-time Analysis**: Instant feedback as you type using the zxcvbn algorithm
- **Visual Strength Meter**: Color-coded strength indicators with detailed percentage scores
- **3D Visualization**: Interactive Three.js animations that reflect password security level
- **Detailed Metrics**:
  - Password composition analysis (uppercase, lowercase, numbers, special characters)
  - Shannon entropy calculation
  - Estimated crack time
  - Number of possible guesses
- **Security Warnings**: Alerts for common passwords found in breach databases
- **Smart Suggestions**: Actionable recommendations to improve password strength
- **Show/Hide Password**: Toggle password visibility with eye icon
- **Clear Function**: Quick clear button for easy password reset

### Password Generator
- **Dual Generation Modes**:
  - **Random Passwords**: Cryptographically secure random character generation
  - **Passphrases**: Memorable multi-word phrases (xkcd-style)
  
- **Extensive Customization**:
  - Adjustable length (4-64 characters)
  - Character type selection (lowercase, uppercase, numbers, special characters)
  - Exclude similar characters (i, l, 1, L, o, 0, O)
  - Exclude ambiguous characters (brackets, quotes, etc.)
  - Custom separators for passphrases
  - Capitalization options
  - Number suffixes for passphrases

- **Instant Feedback**: Generated passwords are automatically analyzed for strength
- **One-Click Copy**: Copy to clipboard with visual confirmation
- **Quality Metrics**: View length, entropy, crack time, and security score

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BTL5010TEJA/passwordstrengthcheacker.git
cd passwordstrengthcheacker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **3D Graphics**: Three.js
- **Password Analysis**: zxcvbn (Dropbox's password strength estimator)
- **Languages**: JavaScript (ES6+), JSX, CSS3

## 📁 Project Structure

```
passwordstrengthcheacker/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Application header
│   │   ├── Footer.jsx                 # Application footer
│   │   ├── PasswordChecker.jsx        # Main checker component
│   │   ├── PasswordGenerator.jsx      # Password generator component
│   │   ├── PasswordInput.jsx          # Password input with controls
│   │   ├── StrengthMeter.jsx          # Visual strength indicator
│   │   ├── FeedbackPanel.jsx          # Detailed analysis panel
│   │   └── PasswordVisualization.jsx  # 3D Three.js visualization
│   ├── utils/
│   │   ├── passwordAnalysis.js        # Analysis and scoring utilities
│   │   └── passwordGenerator.js       # Password generation utilities
│   ├── App.jsx                        # Main application component
│   ├── main.jsx                       # Application entry point
│   └── index.css                      # Global styles
├── public/                            # Static assets
├── index.html                         # HTML template
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS configuration
└── package.json                       # Project dependencies

```

## 🔒 Security & Privacy

- **Client-Side Only**: All password analysis happens in your browser
- **No Data Collection**: Passwords are never sent to any server
- **No Storage**: Passwords are not saved or logged anywhere
- **Open Source**: Full transparency - review the code yourself

## 🎨 Features in Detail

### Password Strength Scoring
The application uses zxcvbn, which considers:
- Pattern matching (dates, repeats, sequences, keyboard patterns)
- Dictionary words (English and common passwords)
- L33t speak substitutions
- Context-aware analysis

### Entropy Calculation
Shannon entropy is calculated to measure password randomness:
- Higher entropy = more secure password
- Takes into account character frequency distribution
- Provides an objective measure of unpredictability

### 3D Visualization
Real-time Three.js animation that:
- Changes color based on password strength (red → orange → yellow → blue → green)
- Animates rotating shield/torus geometry
- Displays particle effects that scale with password strength
- Provides immediate visual feedback

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Teja Lakshman**
- GitHub: [@BTL5010TEJA](https://github.com/BTL5010TEJA)

## 🙏 Acknowledgments

- [zxcvbn](https://github.com/dropbox/zxcvbn) - Dropbox's password strength estimator
- [Three.js](https://threejs.org/) - 3D graphics library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - JavaScript library for building user interfaces

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Known Issues

None currently. Please report any issues on the GitHub issues page.

## 🔄 Version History

- **v2.0.0** - Major upgrade with advanced features
  - Added 3D visualization with Three.js
  - Implemented password generator with multiple modes
  - Enhanced UI with Tailwind CSS
  - Added comprehensive password analysis
  - Improved mobile responsiveness
  
- **v1.0.0** - Initial release
  - Basic password strength checking
  - Simple UI implementation

---

Made with ❤️ by Teja Lakshman
