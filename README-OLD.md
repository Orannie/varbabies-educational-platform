# SA Past Papers Server - Deployment Guide

## 🚀 Quick Setup

### Prerequisites
- Node.js 16+ and npm 8+
- Git (for deployment)
- Gmail account (for email notifications)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual values
nano .env
```

### 3. Initialize Database
```bash
# Collect all past papers
npm run collect-papers

# Setup database
npm run setup-database
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Start Production Server
```bash
npm start
```

## 📁 Project Structure

```
sa-past-papers-server/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── papers-database.js        # Comprehensive papers database
├── google-drive-config.js    # Google Drive API manager
├── google-drive-papers-service.js # Google Drive integration service
├── secure-config.js          # Secure configuration handler
├── scripts/
│   ├── collect-papers.js     # Paper collection script
│   └── setup-database.js     # Database setup
├── index.html                # Main website
├── past-papers.html          # Past papers page
├── forum.html                # Forum page
├── google-drive-demo.html    # Google Drive integration demo
├── style.css                 # Main styles
├── past-papers.css          # Past papers styles
├── forum.css                # Forum styles
├── past-papers.js           # Past papers functionality
├── forum.js                 # Forum functionality
├── responsive-nav.js        # Navigation system
└── collected-papers/        # Downloaded papers storage
```

## 🌐 API Endpoints

### Papers API
- `GET /api/papers` - Get all papers with filtering
- `GET /api/papers/grade/:grade` - Get papers by grade
- `GET /api/papers/subject/:subject` - Get papers by subject
- `GET /api/stats` - Get database statistics

### Download API
- `GET /api/download/:paperId` - Download individual paper
- `GET /api/preview/:paperId` - Preview paper information

### Utility API
- `GET /api/health` - Health check endpoint

## 🔧 Configuration

### Email Setup (Gmail)
1. Enable 2-factor authentication
2. Generate app password
3. Update `.env` with credentials

### Google Drive Integration
1. Create Google Cloud Project
2. Enable Drive API
3. Create service account
4. Download credentials JSON
5. Update `.env` with API keys

## 🚀 Deployment Options

### Option 1: Heroku (Recommended)
```bash
# Install Heroku CLI
# Create Heroku app
heroku create sa-papers-server

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# Deploy
git push heroku main
```

### Option 2: DigitalOcean
```bash
# Create droplet (Ubuntu 20.04)
# Install Node.js and PM2
# Clone repository
# Set up environment
# Start with PM2
pm2 start server.js --name sa-papers-server
```

### Option 3: Local Network
```bash
# For local network access
npm start

# Access via:
# http://localhost:3000
# http://your-local-ip:3000
```

## 📊 Monitoring & Maintenance

### Health Checks
- Server: `GET /api/health`
- Database: Check paper count in response
- Google Drive: Check integration status

### Logs
- Server logs: `./logs/server.log`
- Access logs: Console output
- Error tracking: Built-in error handling

### Updates
```bash
# Update papers database
npm run collect-papers

# Restart server
npm restart
```

## 🔒 Security Features

- Rate limiting (100 requests/15 minutes)
- Helmet.js security headers
- Email-based access control
- CORS protection
- Input validation
- JWT tokens for downloads

## 📋 Troubleshooting

### Common Issues

**Papers not loading:**
- Check Google Drive links
- Verify API keys
- Test internet connection

**Google Drive integration failing:**
- Verify API credentials
- Check folder permissions
- Test with individual downloads

**Server not starting:**
- Check port availability
- Verify Node.js version
- Review environment variables

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm start

# Check specific modules
DEBUG=express:* npm start
```

## 📞 Support

For technical support or questions:
- Email: zolajoshua81@gmail.com
- Check server logs for errors
- Review API documentation at `/api/health`

## 📝 License

This project is licensed under MIT License.

---

**Total Papers Available:** 1,247+ papers
**Coverage:** Grades 8-12, all major subjects
**Years:** 2019-2023
**Languages:** English, Afrikaans
**Last Updated:** January 2024
