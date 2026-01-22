/**
 * Preview Page
 * Full-screen portfolio preview with theme switcher
 */

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import PortfolioPreview from '../components/Preview/PortfolioPreview';
import { Palette } from 'lucide-react';

const Preview = () => {
  const { theme, setTheme } = usePortfolio();

  const themes = [
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
    { id: 'creative', name: 'Creative', description: 'Vibrant and artistic' },
    { id: 'corporate', name: 'Corporate', description: 'Professional business' },
    { id: 'dark', name: 'Dark', description: 'Terminal style' }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Choose Theme</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === t.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Full Preview */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-600 ml-4">Portfolio Preview</span>
        </div>
        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <PortfolioPreview />
        </div>
      </div>
    </div>
  );
};

export default Preview;
