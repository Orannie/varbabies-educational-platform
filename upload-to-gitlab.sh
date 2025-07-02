#!/bin/bash
# GitLab Upload Script for VarBabies Educational Platform

echo "🦊 VarBabies GitLab Upload Script"
echo "================================="
echo ""

# Check if user provided GitLab username
if [ -z "$1" ]; then
    echo "❌ Please provide your GitLab username"
    echo "Usage: ./upload-to-gitlab.sh YOUR_GITLAB_USERNAME"
    echo ""
    echo "Example: ./upload-to-gitlab.sh zolajoshua"
    echo ""
    echo "🔧 Options:"
    echo "  1. Add GitLab as additional remote (keep GitHub)"
    echo "  2. Replace GitHub with GitLab"
    echo ""
    read -p "Choose option (1 or 2): " choice
    echo ""
    
    if [ "$choice" = "1" ]; then
        echo "📝 This will add GitLab as 'gitlab' remote (keeping GitHub as 'origin')"
    elif [ "$choice" = "2" ]; then
        echo "📝 This will replace GitHub with GitLab as 'origin'"
    else
        echo "❌ Invalid choice. Exiting."
        exit 1
    fi
    
    read -p "Enter your GitLab username: " GITLAB_USERNAME
else
    GITLAB_USERNAME=$1
    choice="1"  # Default to adding as additional remote
fi

REPO_NAME="varbabies-educational-platform"

echo ""
echo "🔄 Current remotes:"
git remote -v

if [ "$choice" = "2" ]; then
    echo ""
    echo "🗑️ Removing GitHub remote..."
    git remote remove origin
    
    echo "📝 Adding GitLab as origin..."
    git remote add origin https://gitlab.com/$GITLAB_USERNAME/$REPO_NAME.git
    
    echo "📤 Pushing to GitLab..."
    git push -u origin main
    
elif [ "$choice" = "1" ]; then
    echo ""
    echo "📝 Adding GitLab as additional remote..."
    git remote add gitlab https://gitlab.com/$GITLAB_USERNAME/$REPO_NAME.git
    
    echo "📤 Pushing to GitLab..."
    git push -u gitlab main
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your project is now on GitLab!"
    echo "🌐 GitLab Repository: https://gitlab.com/$GITLAB_USERNAME/$REPO_NAME"
    echo "📱 GitLab Features you can now use:"
    echo "   • GitLab Pages for hosting"
    echo "   • CI/CD Pipelines"
    echo "   • Issue tracking"
    echo "   • Wiki documentation"
    echo "   • Container Registry"
    echo ""
    echo "🔄 Your remotes are now:"
    git remote -v
else
    echo ""
    echo "❌ Upload failed. Please check:"
    echo "   • You created the repository on GitLab.com"
    echo "   • Repository name is exactly: $REPO_NAME"
    echo "   • You have internet connection"
    echo "   • Your GitLab credentials are correct"
    echo ""
    echo "📝 To create GitLab repository:"
    echo "   1. Go to https://gitlab.com"
    echo "   2. Click 'New project' > 'Create blank project'"
    echo "   3. Project name: $REPO_NAME"
    echo "   4. Make it Public"
    echo "   5. DON'T initialize with README"
fi
