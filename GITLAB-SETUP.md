# GitLab Setup Guide for VarBabies Educational Platform

## 🦊 Your project is now on GitLab!

### 🌐 Repository URLs:
- **GitLab**: https://gitlab.com/Orannie/varbabies-educational-platform
- **GitHub**: https://github.com/Orannie/varbabies-educational-platform

## 🚀 GitLab Features Available:

### 1. **GitLab Pages (Free Website Hosting)**
- Automatically deploy your web app
- Custom domain support
- HTTPS enabled by default
- Access at: `https://orannie.gitlab.io/varbabies-educational-platform`

### 2. **CI/CD Pipelines**
- Automatic testing and deployment
- Build React Native apps automatically
- Deploy to app stores
- Quality checks and linting

### 3. **Container Registry**
- Store Docker images
- Deploy containerized applications
- Kubernetes integration

### 4. **Advanced Project Management**
- Issue boards with labels
- Milestones and time tracking
- Wiki for documentation
- Merge request templates

## 🔧 GitLab Configuration:

### Enable GitLab Pages:
1. Go to your GitLab repository
2. Settings > Pages
3. Create `.gitlab-ci.yml` for automatic deployment

### Sample `.gitlab-ci.yml` for your project:
```yaml
# GitLab CI/CD Pipeline for VarBabies
stages:
  - test
  - build
  - deploy

# Test the Node.js application
test_web:
  stage: test
  image: node:18
  script:
    - npm install
    - npm test
  only:
    - main
    - merge_requests

# Test React Native app
test_mobile:
  stage: test
  image: node:18
  script:
    - cd react-native-app
    - npm install
    - npx expo doctor
  only:
    - main

# Deploy to GitLab Pages
pages:
  stage: deploy
  image: node:18
  script:
    - npm install
    - npm run build || echo "No build script, serving static files"
    - mkdir public
    - cp -r * public/ || true
    - cp index.html public/
  artifacts:
    paths:
      - public
  only:
    - main
```

## 🔄 Working with Both Repositories:

### Push to both GitHub and GitLab:
```bash
# Push to GitHub
git push origin main

# Push to GitLab
git push gitlab main

# Or push to both at once
git push origin main && git push gitlab main
```

### Set up aliases for easier pushing:
```bash
# Add to your ~/.bashrc or ~/.zshrc
alias git-push-all="git push origin main && git push gitlab main"
```

## 🎯 GitLab Advantages:

### For Your Educational Platform:
- **Free CI/CD minutes**: 400 minutes/month
- **Free GitLab Pages**: Unlimited static sites
- **Free private repositories**: Unlimited
- **Built-in Docker registry**: For containerization
- **Advanced security scanning**: Vulnerability detection
- **Wiki and documentation**: Better than GitHub

### For React Native Development:
- **Mobile DevOps**: iOS/Android CI/CD
- **Review Apps**: Test branches automatically
- **Security scanning**: Dependency vulnerability checks
- **Performance monitoring**: Built-in APM

## 📱 Next Steps:

1. **Enable GitLab Pages** for live website
2. **Set up CI/CD pipeline** for automatic deployment
3. **Configure issue templates** for bug reports
4. **Add project badges** to README
5. **Enable security scanning** for dependencies

## 🌟 GitLab vs GitHub Comparison:

| Feature | GitLab | GitHub |
|---------|--------|---------|
| CI/CD | ✅ Built-in | ➕ GitHub Actions |
| Pages | ✅ Free unlimited | ✅ Free public only |
| Private repos | ✅ Free unlimited | ✅ Free unlimited |
| Security scanning | ✅ Built-in | ➕ Third-party |
| Project management | ✅ Advanced boards | ➕ Basic projects |
| Container registry | ✅ Built-in | ➕ Third-party |

Your project is now available on both platforms, giving you the best of both worlds! 🚀
