# VarBabies Educational Platform

A comprehensive educational platform providing access to South African past papers, study resources, and university information for Grade 8-12 students.

## 🚀 Features

### Web Application
- **Past Papers Access**: Grade 8-12 past papers with advanced filtering
- **Interactive Forum**: University news, application deadlines, and student discussions
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Real-time Updates**: Latest university news and application information

### React Native Mobile App
- **Cross-platform**: iOS and Android support
- **Native Navigation**: Smooth tab-based navigation
- **Offline Ready**: Downloadable content for offline study
- **Push Notifications**: Important updates and deadlines

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **SA Papers Integration** (Exclusive backend)
- **Real-time data processing**
- **RESTful API endpoints**

### Frontend
- **HTML5/CSS3/JavaScript** (Web)
- **React Native** with Expo (Mobile)
- **Material Design 3** inspired UI
- **Responsive Grid System**

### Development Tools
- **Expo CLI** for React Native development
- **Metro Bundler** for JavaScript bundling
- **Git** for version control

## 📱 Installation & Setup

### Web Application
```bash
# Clone the repository
git clone https://github.com/yourusername/varbabies-educational-platform.git
cd varbabies-educational-platform

# Install dependencies
npm install

# Start the development server
npm start
# Server will run on http://localhost:8080
```

### React Native App
```bash
# Navigate to React Native app
cd react-native-app

# Install dependencies
npm install

# Start Expo development server
npx expo start

# Options:
npx expo start --web      # For web browser testing
npx expo start --tunnel   # For network issues
npx expo start --localhost # For local development
```

## 🌐 Usage

### Web Access
- **Main Site**: http://localhost:8080
- **Past Papers**: http://localhost:8080/past-papers.html
- **Forum**: http://localhost:8080/forum.html

### Mobile Access
- Use **Expo Go** app to scan QR code
- Or open in web browser for testing

## 📂 Project Structure

```
varbabies-educational-platform/
├── 📁 react-native-app/          # Mobile app source
│   ├── 📁 src/
│   │   ├── 📁 screens/           # App screens
│   │   ├── 📁 components/        # Reusable components
│   │   └── 📁 context/           # React context
│   ├── 📁 assets/                # Images and icons
│   ├── app.json                  # Expo configuration
│   └── package.json              # Dependencies
├── 📁 image/                     # Web assets
├── 📁 scripts/                   # Backend scripts
├── index.html                    # Main landing page
├── past-papers.html              # Past papers interface
├── forum.html                    # Forum page
├── server.js                     # Express server
├── style.css                     # Global styles
└── README.md                     # Project documentation
```

## 🎯 Key Features

### Past Papers System
- **Advanced Filtering**: By grade, subject, year, province
- **Direct Downloads**: Integrated with SA Papers
- **Preview Mode**: Quick paper preview
- **Search Functionality**: Find specific papers quickly

### Forum System
- **University News**: Latest updates from all major SA universities
- **Application Tracking**: Deadlines and requirements
- **Quick Actions**: Direct links to application portals
- **Mobile Responsive**: Works on all devices

### Mobile App Features
- **Native Performance**: Built with React Native
- **Offline Support**: Download papers for offline study
- **Push Notifications**: Never miss important updates
- **Cross-platform**: One codebase for iOS and Android

## 🚀 Deployment

### Web Application
```bash
# Production build
npm run build

# Start production server
npm start
```

### Mobile App
```bash
# Build for Android
npx eas build --platform android

# Build for iOS
npx eas build --platform ios

# Build for both platforms
npx eas build --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Zola Joshua**
- Email: zolajoshua81@gmail.com
- Instagram: [@orannieofficial](https://instagram.com/orannieofficial)

## 🙏 Acknowledgments

- **SA Papers** for providing access to past papers
- **Expo** for React Native development tools
- **Font Awesome** for icons
- **Google Fonts** for typography

---

**VarBabies** - Empowering South African students with accessible education resources 🇿🇦
