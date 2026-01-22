# 🔍 Installation & Verification Guide

This guide will help you verify that everything is set up correctly.

---

## ✅ Pre-Installation Checklist

Before you begin, make sure you have:

- [ ] **Node.js** (v16 or higher) - Run `node --version`
- [ ] **npm** (v7 or higher) - Run `npm --version`
- [ ] **Git** (optional, for version control)
- [ ] **Code editor** (VS Code recommended)
- [ ] **Modern web browser** (Chrome, Firefox, Safari, Edge)

---

## 🚀 Quick Installation

### Option 1: Automated Setup (Recommended)

```bash
# 1. Navigate to project directory
cd /home/navgurukul/portfolio

# 2. Run setup script
chmod +x setup.sh
./setup.sh

# 3. Start development
npm run dev
```

### Option 2: Manual Installation

```bash
# 1. Navigate to project directory
cd /home/navgurukul/portfolio

# 2. Install root dependencies
npm install

# 3. Install server dependencies
cd server
npm install
cd ..

# 4. Install client dependencies
cd client
npm install
cd ..

# 5. Setup environment variables
cp server/.env.example server/.env

# 6. Start development servers
npm run dev
```

---

## ✅ Verification Steps

### Step 1: Check Project Structure

Run this command to see if all files are present:

```bash
ls -la
```

You should see:
```
✅ client/
✅ server/
✅ package.json
✅ README.md
✅ setup.sh
✅ .gitignore
✅ GETTING_STARTED.md
✅ TECHNICAL_DOCS.md
✅ PROJECT_SUMMARY.md
✅ VISUAL_OVERVIEW.md
```

### Step 2: Verify Dependencies

Check if dependencies were installed:

```bash
# Check root node_modules
ls node_modules | wc -l

# Check server node_modules
ls server/node_modules | wc -l

# Check client node_modules
ls client/node_modules | wc -l
```

All three should show numbers > 0 (hundreds of packages).

### Step 3: Check Environment Configuration

```bash
cat server/.env
```

Should show:
```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
USE_MOCK_AI=true
NODE_ENV=development
```

### Step 4: Test Backend Server

```bash
# Terminal 1: Start backend
cd server
npm run dev
```

Look for:
```
✅ 🚀 Server running on port 5000
✅ 🤖 AI Mode: Mock AI
✅ 📝 Environment: development
```

Test the health endpoint:
```bash
# Terminal 2:
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "AI Portfolio Generator API is running",
  "timestamp": "2026-01-22T..."
}
```

### Step 5: Test Frontend

```bash
# Terminal 1: Start frontend
cd client
npm run dev
```

Look for:
```
✅ VITE ready in XXX ms
✅ Local:   http://localhost:3000
✅ Network: use --host to expose
```

Open browser and visit: http://localhost:3000

You should see:
- ✅ AI Portfolio Generator header
- ✅ Navigation (Builder, Preview, Export)
- ✅ Builder page with forms
- ✅ No console errors

### Step 6: Test Full System

Start both servers with:
```bash
npm run dev
```

Should see:
```
✅ [server] 🚀 Server running on port 5000
✅ [server] 🤖 AI Mode: Mock AI
✅ [client] VITE ready
✅ [client] Local: http://localhost:3000
```

---

## 🧪 Functional Testing

### Test 1: Personal Info Form

1. Go to http://localhost:3000/builder
2. Fill in:
   - Name: Test User
   - Role: Developer
   - Bio: I am a developer
3. Click "AI Enhance" button
4. Should see enhanced bio appear
5. Click "Accept"

✅ **Pass**: Bio is enhanced and applied  
❌ **Fail**: Check console for errors

### Test 2: Skills Management

1. In Builder, click "Skills" in sidebar
2. Type "React" in input
3. Click "Add" or press Enter
4. Should see "React" tag appear

✅ **Pass**: Skill added successfully  
❌ **Fail**: Check if Context is working

### Test 3: Live Preview

1. Fill some data in any form
2. Look at preview panel (right side)
3. Should update in real-time

✅ **Pass**: Preview updates automatically  
❌ **Fail**: Check PortfolioContext

### Test 4: Theme Switching

1. Go to Preview page
2. Click different theme buttons
3. Preview should change immediately

✅ **Pass**: Themes switch correctly  
❌ **Fail**: Check theme components

### Test 5: Export Functionality

1. Go to Export page
2. Click "Generate HTML"
3. Should see HTML code preview
4. Click "Download"
5. Should download HTML file

✅ **Pass**: Export works correctly  
❌ **Fail**: Check backend API connection

---

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### Issue 2: Cannot Find Module

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules server/node_modules client/node_modules
npm run install-all
```

### Issue 3: AI Enhancement Not Working

**Symptom:** Clicking "AI Enhance" does nothing

**Check:**
1. Open browser console (F12)
2. Look for errors
3. Check Network tab for failed requests

**Solution:**
```bash
# Make sure backend is running
cd server
npm run dev

# Check .env file
cat .env  # Should show USE_MOCK_AI=true
```

### Issue 4: Blank Page

**Symptom:** Browser shows blank page

**Check:**
1. Open console (F12)
2. Look for errors
3. Check if frontend is running

**Solution:**
```bash
# Clear browser cache
# Hard reload: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# Restart frontend
cd client
npm run dev
```

### Issue 5: CORS Error

**Error:**
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```

**Solution:**
```bash
# Make sure CORS is enabled in server/index.js
# Should see: app.use(cors());

# Restart backend
cd server
npm run dev
```

---

## 📊 System Health Check

Run this complete health check:

### Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected:
```json
{ "status": "ok", "message": "..." }
```

### Frontend Health
```bash
curl http://localhost:3000
```

Expected:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ...
```

### AI Endpoint Test
```bash
curl -X POST http://localhost:5000/api/ai/enhance \
  -H "Content-Type: application/json" \
  -d '{"text":"test","type":"bio"}'
```

Expected:
```json
{
  "original": "test",
  "enhanced": "...",
  "suggestions": [...]
}
```

---

## 🎯 Success Checklist

After installation, you should be able to:

- [ ] ✅ Access http://localhost:3000 (frontend)
- [ ] ✅ Access http://localhost:5000/api/health (backend)
- [ ] ✅ Fill forms in Builder page
- [ ] ✅ Use AI enhancement feature
- [ ] ✅ Add/edit/delete education, skills, projects
- [ ] ✅ See live preview
- [ ] ✅ Switch themes
- [ ] ✅ Export HTML
- [ ] ✅ Export React component
- [ ] ✅ Download files
- [ ] ✅ Data persists after refresh

---

## 🔧 Developer Tools

### Recommended VS Code Extensions

```bash
# React & JavaScript
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier

# Tailwind CSS
- Tailwind CSS IntelliSense

# General
- Auto Rename Tag
- Path Intellisense
- npm Intellisense
```

### Browser DevTools

**Chrome/Edge:**
- F12 to open
- Console tab for errors
- Network tab for API calls
- React DevTools extension

**Firefox:**
- F12 to open
- Console tab
- Network tab

---

## 📈 Performance Verification

### Build Size Check

```bash
cd client
npm run build
```

Check dist/ folder size:
```bash
du -sh dist/
```

Should be < 1MB for optimized build.

### Load Time Check

Open browser DevTools:
1. Go to Network tab
2. Hard reload (Ctrl+Shift+R)
3. Check "Finish" time

Should be < 2 seconds on fast connection.

---

## 🎓 Next Steps After Installation

1. **Explore the Interface**
   - Try all forms
   - Add sample data
   - Test AI features

2. **Read Documentation**
   - README.md for overview
   - GETTING_STARTED.md for quick start
   - TECHNICAL_DOCS.md for deep dive

3. **Customize**
   - Modify themes
   - Add new sections
   - Change colors

4. **Deploy**
   - Build for production
   - Deploy to Vercel/Netlify
   - Share with others

---

## 💡 Tips for Smooth Operation

### Development Tips
- Keep terminal windows visible to see errors
- Use browser console to debug
- Save work frequently (auto-save is enabled)
- Test in different browsers

### Performance Tips
- Close unused tabs
- Clear browser cache periodically
- Restart servers if slow
- Use production build for deployment

### Debugging Tips
- Check console for errors first
- Verify API is running
- Look at Network tab for failed requests
- Read error messages carefully

---

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation**
   - README.md
   - TECHNICAL_DOCS.md
   - This file

2. **Check Logs**
   - Browser console (F12)
   - Terminal output
   - Server logs

3. **Common Solutions**
   - Restart servers
   - Clear cache
   - Reinstall dependencies
   - Check environment variables

4. **Debug Steps**
   - Isolate the problem
   - Check one thing at a time
   - Look for error messages
   - Test with sample data

---

## ✅ Installation Complete!

If all checks passed, you're ready to go! 🎉

**Start creating amazing portfolios:**

```bash
npm run dev
```

Then open: http://localhost:3000

---

**Happy Portfolio Building! 🚀**
