/**
 * Main Layout Component
 * Provides navigation and page structure
 */

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FileText, Eye, Download, Sparkles } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Portfolio Generator</h1>
                <p className="text-xs text-gray-500">Create your professional portfolio in minutes</p>
              </div>
            </div>

            <nav className="flex space-x-1">
              <NavLink
                to="/builder"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <FileText className="w-4 h-4" />
                <span>Builder</span>
              </NavLink>

              <NavLink
                to="/preview"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </NavLink>

              <NavLink
                to="/export"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Built with ❤️ using React, Node.js, and AI • © 2026 AI Portfolio Generator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
