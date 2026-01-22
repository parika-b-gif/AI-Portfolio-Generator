# 🚀 AI Portfolio Generator

**Create professional, AI-powered portfolio websites without writing any code!**

A complete full-stack application that allows students and professionals to build polished, responsive, and customizable portfolio websites. Features AI-powered content enhancement using OpenAI to transform casual text into professional portfolio content.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

### 🎯 Core Features

- **📝 User-Friendly Forms**: Intuitive forms for personal info, education, skills, projects, experience, certifications, and social links
- **🤖 AI Content Enhancement**: 
  - Transform casual text into professional content
  - Grammar and clarity improvements
  - Side-by-side comparison (original vs enhanced)
  - Accept/reject AI suggestions
  - Powered by OpenAI GPT (with mock fallback)
  
- **🎨 Multiple Themes**:
  - **Minimal**: Clean and simple design
  - **Creative**: Vibrant gradient-based layout
  - **Corporate**: Professional business style
  - **Dark**: Terminal-inspired theme
  
- **👁️ Live Preview**: Real-time portfolio preview as you edit
- **📦 Multiple Export Formats**:
  - Static HTML (single file with inline CSS)
  - React Component (JSX + CSS)
  - PDF (coming soon)
  
- **💾 Auto-Save**: Automatic localStorage persistence
- **📱 Responsive Design**: Works perfectly on mobile, tablet, and desktop

---

## 🏗️ Project Structure

```
ai-portfolio-generator/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Forms/              # Input forms for all sections
│   │   │   │   ├── PersonalInfoForm.jsx
│   │   │   │   ├── EducationForm.jsx
│   │   │   │   ├── SkillsForm.jsx
│   │   │   │   ├── ProjectsForm.jsx
│   │   │   │   ├── ExperienceForm.jsx
│   │   │   │   ├── CertificationsForm.jsx
│   │   │   │   └── SocialLinksForm.jsx
│   │   │   ├── Layout/             # Main layout components
│   │   │   │   └── Layout.jsx
│   │   │   ├── Preview/            # Preview components
│   │   │   │   └── PortfolioPreview.jsx
│   │   │   └── Themes/             # Theme templates
│   │   │       ├── MinimalTheme.jsx
│   │   │       ├── CreativeTheme.jsx
│   │   │       ├── CorporateTheme.jsx
│   │   │       └── DarkTheme.jsx
│   │   ├── context/                # React Context for state
│   │   │   └── PortfolioContext.jsx
│   │   ├── pages/                  # Main pages
│   │   │   ├── Builder.jsx
│   │   │   ├── Preview.jsx
│   │   │   └── Export.jsx
│   │   ├── services/               # API services
│   │   │   └── api.js
│   │   ├── data/                   # Sample data
│   │   │   └── sampleData.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Node.js Backend
│   ├── routes/
│   │   ├── ai.routes.js            # AI enhancement endpoints
│   │   └── export.routes.js        # Export generation endpoints
│   ├── services/
│   │   ├── ai.service.js           # AI/OpenAI integration
│   │   └── export.service.js       # Export generation logic
│   ├── index.js                    # Express server entry
│   ├── package.json
│   └── .env.example
│
├── package.json                     # Root package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Toastify**: Beautiful notifications
- **Lucide React**: Modern icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **OpenAI API**: AI content enhancement
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

---

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (optional - mock AI is available)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 3. Configure Environment Variables

```bash
# Create .env file in server directory
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
USE_MOCK_AI=true                    # Set to false to use real OpenAI API
NODE_ENV=development
```

**Note**: Set `USE_MOCK_AI=true` to use the built-in mock AI (no API key needed). Set to `false` to use real OpenAI API.

### 4. Start the Development Servers

```bash
# From root directory - starts both frontend and backend
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Backend (from root)
npm run server

# Terminal 2 - Frontend (from root)
npm run client
```

### 5. Open in Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📖 Usage Guide

### Building Your Portfolio

1. **Personal Info** (Required)
   - Enter your name, role, and bio
   - Use the **AI Enhance** button to make your bio more professional
   - Add contact details

2. **Education**
   - Add degrees, certifications, and courses
   - Include institution names and years

3. **Skills**
   - Add technical and soft skills
   - Use quick-add suggestions for popular technologies

4. **Experience**
   - Add work history with job titles and companies
   - Use AI to enhance job descriptions

5. **Projects**
   - Showcase your best work
   - Add tech stacks, live links, and GitHub repos
   - Let AI refine your project descriptions

6. **Certifications**
   - Add professional certifications
   - Include issuing organizations

7. **Social Links**
   - Connect your GitHub, LinkedIn, Twitter, etc.

### Using AI Enhancement

1. Write your content naturally (don't worry about perfection)
2. Click the **AI Enhance** button
3. Review the AI-generated professional version
4. **Accept** to use it or **Reject** to keep your original
5. You can always edit the enhanced version

### Previewing Your Portfolio

1. Navigate to the **Preview** tab
2. Switch between themes:
   - **Minimal**: Clean, professional
   - **Creative**: Colorful, artistic
   - **Corporate**: Business-focused
   - **Dark**: Developer-style terminal theme
3. See real-time updates as you edit

### Exporting Your Portfolio

1. Go to the **Export** tab
2. Choose your format:

   **Static HTML**:
   - Single HTML file with inline CSS
   - No build process required
   - Perfect for simple hosting

   **React Component**:
   - Reusable JSX component
   - Separate CSS file
   - Integrate into existing React apps

3. Click **Generate** to create the code
4. Review the code preview
5. Click **Download** to save the file
6. Follow deployment instructions

---

## 🌐 Deployment

### Deploying Static HTML

**GitHub Pages**:
```bash
1. Upload HTML file to your repository
2. Enable GitHub Pages in repository settings
3. Access at https://yourusername.github.io
```

**Netlify** (Drag & Drop):
```bash
1. Go to https://app.netlify.com/drop
2. Drag your HTML file
3. Get instant live URL
```

### Deploying Full Application

**Frontend (Vercel)**:
```bash
cd client
npm run build
vercel --prod
```

**Backend (Heroku)**:
```bash
cd server
heroku create your-app-name
git push heroku main
```

---

## 🔧 Configuration

### Customizing Themes

Edit theme files in `client/src/components/Themes/`:

```javascript
// Example: Modify MinimalTheme.jsx
const MinimalTheme = ({ data }) => {
  return (
    <div className="your-custom-classes">
      {/* Your custom layout */}
    </div>
  );
};
```

### Adding New Sections

1. Create form component in `client/src/components/Forms/`
2. Add to context in `client/src/context/PortfolioContext.jsx`
3. Update theme templates to display new section
4. Add to Builder page navigation

---

## 🤖 AI Integration

### Using OpenAI API

1. Get API key from https://platform.openai.com/
2. Set in `server/.env`:
   ```env
   OPENAI_API_KEY=sk-...
   USE_MOCK_AI=false
   ```

### Mock AI Mode

- Perfect for development and testing
- No API key required
- Basic text enhancement rules
- Set `USE_MOCK_AI=true` in `.env`

### Custom AI Service

Implement your own AI service by modifying `server/services/ai.service.js`:

```javascript
async enhanceText(text, type) {
  // Your custom AI logic here
  return {
    original: text,
    enhanced: yourEnhancedText,
    suggestions: yourSuggestions
  };
}
```

---

## 📝 API Documentation

### AI Endpoints

**POST** `/api/ai/enhance`
```json
{
  "text": "Your text to enhance",
  "type": "bio|project|experience|general"
}
```

**POST** `/api/ai/batch-enhance`
```json
{
  "items": [
    { "id": 1, "text": "Text 1", "type": "bio" },
    { "id": 2, "text": "Text 2", "type": "project" }
  ]
}
```

**POST** `/api/ai/generate-summary`
```json
{
  "name": "John Doe",
  "role": "Developer",
  "skills": ["React", "Node.js"]
}
```

### Export Endpoints

**POST** `/api/export/html`
```json
{
  "portfolioData": { /* full portfolio object */ },
  "theme": "minimal|creative|corporate|dark"
}
```

**POST** `/api/export/react`
```json
{
  "portfolioData": { /* full portfolio object */ },
  "theme": "minimal"
}
```

---

## 🎨 Sample Data

Load sample data for testing:

```javascript
import samplePortfolioData from './data/sampleData';

// Use in your app
console.log(samplePortfolioData);
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### AI Not Working
- Check `USE_MOCK_AI` setting in `.env`
- Verify OpenAI API key if using real API
- Check server logs for errors

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- OpenAI for GPT API
- Tailwind CSS for styling system
- React team for amazing framework
- All open-source contributors

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact: support@example.com

---

## 🗺️ Roadmap

- [ ] PDF export functionality
- [ ] More theme templates
- [ ] Custom theme builder
- [ ] Multi-language support
- [ ] Image upload for projects
- [ ] Analytics integration
- [ ] Custom domain setup guide
- [ ] Video introduction section
- [ ] Blog integration
- [ ] SEO optimization tools

---

**Built with ❤️ for students and professionals worldwide**

Happy Portfolio Building! 🎉
