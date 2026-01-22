#!/bin/bash

echo "🚀 AI Portfolio Generator - Quick Start Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo ""

echo "Installing root dependencies..."
npm install

echo ""
echo "Installing server dependencies..."
cd server && npm install && cd ..

echo ""
echo "Installing client dependencies..."
cd client && npm install && cd ..

echo ""
echo "✅ All dependencies installed!"
echo ""

# Setup environment file
if [ ! -f "server/.env" ]; then
    echo "⚙️  Setting up environment variables..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env file"
    echo ""
    echo "⚠️  Note: Using MOCK AI by default (no API key needed)"
    echo "   To use OpenAI API, edit server/.env and add your API key"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "=============================================="
echo "✨ Setup Complete!"
echo "=============================================="
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Start the development servers:"
echo "   npm run dev"
echo ""
echo "2. Open your browser:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "3. (Optional) To use real OpenAI API:"
echo "   - Get API key from https://platform.openai.com/"
echo "   - Edit server/.env and set OPENAI_API_KEY"
echo "   - Set USE_MOCK_AI=false"
echo ""
echo "📚 For more details, see README.md"
echo ""
echo "Happy Portfolio Building! 🎉"
