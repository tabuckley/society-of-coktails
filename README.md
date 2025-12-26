# My Interactive Website

A fun interactive website playground with games and cool effects!

## What's Inside

This website has 5 interactive sections:

1. **Color Changer** - Click to change the background gradient
2. **Counter** - Increase, decrease, or reset a number
3. **Click Speed Game** - See how fast you can click in 5 seconds
4. **Catch the Box** - Click the moving box as it jumps around
5. **Text Effects** - Type text and see it appear in ALL CAPS

## How to View Locally

Just open [index.html](index.html) in your web browser! Double-click the file and it will open.

## Files Explained

- [index.html](index.html) - The structure of your website (the content)
- [styles.css](styles.css) - How it looks (colors, sizes, animations)
- [script.js](script.js) - What makes it interactive (the JavaScript code)
- [package.json](package.json) - Info about the project (needed for Railway)
- [railway.json](railway.json) - Tells Railway how to run the website

## How to Deploy to Railway

### Step 1: Push to GitHub

1. Make sure you have a GitHub account (sign up at https://github.com)
2. Create a new repository on GitHub
3. In your terminal in this folder, run:

```bash
git add .
git commit -m "Initial commit - interactive website"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

(Replace `YOUR_GITHUB_REPO_URL` with your actual GitHub repo URL)

### Step 2: Deploy on Railway

1. Go to https://railway.app and sign up (you can use your GitHub account)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will automatically detect and deploy your website
6. After a few minutes, you'll get a URL like `your-site.railway.app`
7. Click the URL and your website is live!

### Step 3: Make Changes

Whenever you want to update your website:

1. Edit the files on your computer
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Description of what you changed"
   git push
   ```
3. Railway automatically updates your live site!

## How to Customize

### Change Colors
Edit [styles.css](styles.css) - look for color codes like `#667eea`

### Add More Features
Edit [script.js](script.js) - add your own JavaScript functions

### Change Text/Layout
Edit [index.html](index.html) - modify the HTML structure

## Learning Resources

- **HTML**: https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

## Have Fun!

This is YOUR playground. Break things, experiment, and learn. You can always undo changes with Git!
