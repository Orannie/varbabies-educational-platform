#!/bin/bash
# GitHub Upload Script for VarBabies Educational Platform

echo "🚀 VarBabies GitHub Upload Script"
echo "================================="
echo ""

# Check if user provided GitHub username
if [ -z "$1" ]; then
    echo "❌ Please provide your GitHub username"
    echo "Usage: ./upload-to-github.sh YOUR_GITHUB_USERNAME"
    echo ""
    echo "Example: ./upload-to-github.sh zolajoshua"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="varbabies-educational-platform"

echo "📝 Setting up remote repository..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your project is now on GitHub!"
    echo "🌐 Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "📱 You can now:"
    echo "   • Share your project with others"
    echo "   • Enable GitHub Pages for live website"
    echo "   • Collaborate with other developers"
    echo "   • Track issues and improvements"
else
    echo ""
    echo "❌ Upload failed. Please check:"
    echo "   • You created the repository on GitHub.com"
    echo "   • Repository name is exactly: $REPO_NAME"
    echo "   • You have internet connection"
    echo "   • Your GitHub credentials are correct"
fi
