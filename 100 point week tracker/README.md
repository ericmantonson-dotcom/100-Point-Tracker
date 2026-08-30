# 100 Point Week Tracker

A simple, honest tracker for your real productive work based on Peyson Robertson's 100 Point Week system.

## Setup (Local Development)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173 in your browser
```

## Deploy to Vercel (Free, 5 Minutes)

### Step 1: Create a GitHub account (if you don't have one)
- Go to https://github.com/signup
- Follow the prompts

### Step 2: Create a new repository
- Go to https://github.com/new
- Name it `100-point-tracker`
- Click "Create repository"

### Step 3: Push this code to GitHub
Copy the folder to your computer, then open Terminal/Command Prompt in that folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/100-point-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. On the import screen, find and select `100-point-tracker`
5. Click "Import"
6. Vercel will auto-detect it's a React/Vite app
7. Click "Deploy"

Done! Your app is now live at a URL like `100-point-tracker-abc123.vercel.app`

## How to Use

- **Quick-add buttons** for all 15 activity types
- **Log same-day** — don't wait until evening (the system punishes memory-rounded numbers)
- **Daily target** is 20 points (5 days a week = 100)
- **All data saved locally** in your browser — works offline too

## Data Privacy

All your tracking data is stored in your browser's local storage. It never leaves your device. Nothing is sent to any server.

## Tips

- The 2-minute rule is strict: if a conversation was under 2 minutes, delete it
- Check your daily total at 3pm — tells you exactly what you need by end of day
- Text your daily number to an accountability partner every morning (the system depends on it)
