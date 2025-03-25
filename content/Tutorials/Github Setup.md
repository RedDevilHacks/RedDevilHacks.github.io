---
title: Setting Up Git and GitHub
date: 2025-03-24
tags: [tutorial, git, github, essential]
experience: [all-levels]
---

# Setting Up Git and GitHub for Red Devil Hacks

**⚠️ IMPORTANT: All projects must be submitted through GitHub to be eligible for judging**

This guide will walk you through setting up Git and GitHub for the hackathon, regardless of your experience level.

## What are Git and GitHub?

- **Git** is a version control system that tracks changes to your code
- **GitHub** is a web-based platform where you can store your Git repositories and collaborate with others

## Step 1: Install Git

### Windows
1. Download the installer from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer with default options
3. Open Git Bash to verify installation: `git --version`

### macOS
1. If you have Homebrew: `brew install git`
2. Otherwise, download from [git-scm.com](https://git-scm.com/download/mac)
3. Open Terminal and verify: `git --version`

### Linux
1. Use your package manager:
   - Ubuntu/Debian: `sudo apt-get install git`
   - Fedora: `sudo dnf install git`
2. Verify: `git --version`

## Step 2: Create a GitHub Account

1. Go to [github.com](https://github.com)
2. Click "Sign Up" and follow the instructions
3. Verify your email address

## Step 3: Configure Git

Open Terminal/Git Bash and run:

```bash
git config --global user.name "Ty Chermsirivatana"
git config --global user.email "chermsit@dickinson.edu"
```

Use the same email associated with your GitHub account.

## Step 4: Generate SSH Key (Recommended)

1. Generate an SSH key:
   ```bash
   ssh-keygen -t ed25519 
   ```
2. Copy your public key:
   - Windows: `cat ~/.ssh/id_ed25519.pub | clip`
   - macOS: `pbcopy < ~/.ssh/id_ed25519.pub`
   - Linux: `cat ~/.ssh/id_ed25519.pub` and copy manually

3. Add your SSH key to GitHub:
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your key and save

## Step 5: Join the Red Devil Hacks Organization (TBD)

1. Visit [github.com/RedDevilHacks2025](https://github.com/RedDevilHacks)
2. Look for the invitation link or request access from organizers
3. Accept the invitation to join

## Step 6: Create Your Project Repository

1. Go to [github.com/RedDevilHacks2025](https://github.com/RedDevilHacks)
2. Click "New Repository"
3. Name your repository using your team name: `team-name-project`
4. Add a description and set visibility to Public
5. Initialize with README, add a .gitignore appropriate for your project
6. Click "Create repository"

## Step 7: Clone Your Repository

```bash
git clone git@github.com:RedDevilHacks2025/your-repo-name.git
cd your-repo-name
```

## Basic Git Commands

```bash
# Check status of your repository
git status

# Add files to staging
git add filename  # Add specific file
git add .         # Add all files

# Commit changes
git commit -m "Descriptive message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create and switch to a new branch
git checkout -b branch-name

# Switch between branches
git checkout branch-name
```

## Best Practices for Hackathons

1. **Commit frequently** with descriptive messages
2. **Pull before you push** to avoid conflicts
3. **Use branches** for new features
4. **Don't commit sensitive information** (use .gitignore)
5. **Include a detailed README.md** with:
   - Project description
   - Team members
   - Installation instructions
   - How to use your project
   - Screenshots/demos


Remember, proper version control will make your development process smoother and ensure your project can be properly evaluated at the end of the hackathon.