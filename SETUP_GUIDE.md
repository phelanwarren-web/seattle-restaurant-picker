# 🍽️ Seattle Restaurant Picker — Setup Guide

A complete step-by-step guide for a total beginner to get this app live on the internet.

**What you'll have when done:** A web app with a link you can share with anyone — no app store needed.

---

## 📦 What's in this project

```
seattle-restaurant-picker/
├── public/
│   └── index.html       ← The entire app (what users see)
├── server.js            ← The backend (handles sessions & voting)
├── package.json         ← Tells Node.js what this app needs
└── .gitignore           ← Tells git what NOT to upload
```

---

## 🛠️ PHASE 1: Install tools on your computer

### Step 1 — Install Node.js
Node.js is what runs the backend of this app.

1. Go to **https://nodejs.org**
2. Click the big green button that says **"LTS"** (the recommended version)
3. Download and run the installer
4. Click through all the default options
5. To verify it worked: open Terminal (Mac) or Command Prompt (Windows), type `node --version`, press Enter — you should see a number like `v20.x.x`

### Step 2 — Install Git
Git is how you send your code to GitHub.

1. Go to **https://git-scm.com/downloads**
2. Download for your operating system (Mac or Windows)
3. Run the installer with all default settings
4. Verify: in Terminal/Command Prompt, type `git --version` — you should see a version number

---

## 📁 PHASE 2: Set up the project on your computer

### Step 3 — Create a project folder
1. Create a folder on your Desktop (or anywhere you like) called `seattle-restaurant-picker`
2. Copy all the project files into that folder, keeping the same structure as shown above

### Step 4 — Open a terminal in that folder
- **Mac**: Open Terminal, type `cd ` (with a space), then drag your folder into the terminal window and press Enter
- **Windows**: Open the folder in File Explorer, click the address bar at the top, type `cmd`, press Enter

### Step 5 — Install the app's dependencies
In the terminal, type this and press Enter:
```
npm install
```
You'll see a bunch of text scroll by — that's normal. It downloads what the app needs.

### Step 6 — Test it locally
Type this and press Enter:
```
node server.js
```
You should see: `Seattle Restaurant Picker running on port 3000`

Open a browser and go to **http://localhost:3000** — you should see the app! 🎉

Press `Ctrl+C` in the terminal to stop it when done testing.

---

## 🐙 PHASE 3: Put your code on GitHub

GitHub stores your code online (like Google Drive, but for code).

### Step 7 — Create a GitHub account
1. Go to **https://github.com**
2. Click **Sign up** and create a free account
3. Verify your email

### Step 8 — Create a new repository
A "repository" (repo) is like a folder for your project on GitHub.

1. Once logged in, click the **+** icon in the top right → **New repository**
2. Name it: `seattle-restaurant-picker`
3. Leave it set to **Public**
4. Leave all other options as-is
5. Click **Create repository**

### Step 9 — Upload your code to GitHub
Back in your terminal (make sure you're in the `seattle-restaurant-picker` folder), run these commands **one at a time**, pressing Enter after each:

```
git init
```
```
git add .
```
```
git commit -m "First version of Seattle Restaurant Picker"
```

Now you need to connect to your GitHub repo. GitHub will show you a command that looks like this (copy it from YOUR GitHub page, not from here):
```
git remote add origin https://github.com/YOUR-USERNAME/seattle-restaurant-picker.git
```

Then:
```
git branch -M main
```
```
git push -u origin main
```

It may ask for your GitHub username and password. For the password, you need to use a **Personal Access Token** (GitHub stopped accepting regular passwords):
1. Go to GitHub → click your profile picture → Settings → Developer Settings → Personal access tokens → Tokens (classic) → Generate new token
2. Give it any name, set expiration to "No expiration", check the "repo" checkbox
3. Click Generate — **copy the token and save it somewhere safe** (you only see it once)
4. Use this token as your password when git asks

After the push, refresh your GitHub page — your files should appear! ✅

---

## 🚀 PHASE 4: Deploy on Render (make it live!)

Render hosts your app so anyone can visit it with a link.

### Step 10 — Create a Render account
1. Go to **https://render.com**
2. Click **Get Started for Free**
3. Sign up with your **GitHub account** (this connects the two services — recommended!)

### Step 11 — Create a new Web Service
1. Once logged in, click **New +** → **Web Service**
2. Click **Connect a repository** → find and select `seattle-restaurant-picker`
3. Click **Connect**

### Step 12 — Configure the service
Fill in these settings:

| Field | Value |
|-------|-------|
| Name | `seattle-restaurant-picker` (or any name you like) |
| Region | Oregon (US West) — or whatever's closest to you |
| Branch | `main` |
| Runtime | **Node** |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Instance Type | **Free** |

Leave everything else as-is.

### Step 13 — Deploy!
Click **Create Web Service** at the bottom.

Render will take **2–5 minutes** to build and deploy. You'll see logs scrolling — that's normal. When it says **"Your service is live"** (or you see the green dot), you're done!

Your app will be at a URL like: `https://seattle-restaurant-picker.onrender.com`

---

## 🎉 You're live!

Share that URL with your friends. Here's how to use it:

1. **One person** goes to the URL and clicks **"Create a session"**
2. They share the **6-letter code** (or the link) with the group
3. **Everyone else** goes to the URL, enters the code, and answers the quiz
4. The host clicks **"See results"** to reveal the top restaurant picks

### ⚠️ A note about the free tier
Render's free tier **spins down** after 15 minutes of no traffic. The first visit after that takes ~30 seconds to load. This is totally normal on the free plan. If you want it always-fast, upgrade to the $7/month plan on Render.

---

## 🔄 How to update the app in the future

Made a change to the code? Just run these in your terminal:
```
git add .
git commit -m "Describe what you changed"
git push
```
Render will automatically detect the change and redeploy within a few minutes.

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Node.js didn't install correctly. Restart your computer and try again. |
| `git: command not found` | Git didn't install. Restart your computer and try again. |
| GitHub asks for password and rejects it | Use a Personal Access Token (Step 9) |
| Render deploy fails | Check that the Start Command is exactly `node server.js` |
| App loads but sessions don't work | Check Render logs — look for the "running on port" message |

---

## 📝 Adding more restaurants

Open `server.js` and find the `restaurants` array near the top. Each restaurant looks like this:

```javascript
{ 
  name: "Pike Place Chowder",
  genre: ["seafood"],        // cuisine type
  type: ["low key"],         // vibe (low key, somewhat fancy, fancy, child friendly)
  location: ["walkable"],    // walkable, not walkable, eastside
  mealTime: ["lunch", "dinner"],  // breakfast, lunch, dinner, snacks, drinks
  features: ["nice view"],   // nice view, happy hour, themed, none
  neighborhood: "Pike Place"
}
```

Add new entries following the same format, save, and push to GitHub. Render will redeploy automatically.
