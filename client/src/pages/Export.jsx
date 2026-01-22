/**
 * Export Page
 * Export portfolio in various formats
 */

import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { exportAsHTML, exportAsReact, downloadPortfolio } from '../services/api';
import { Download, Code, FileCode, FileText, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const Export = () => {
  const { portfolioData, theme } = usePortfolio();
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleExportHTML = async () => {
    setIsExporting(true);
    setSelectedFormat('html');
    try {
      const result = await exportAsHTML(portfolioData, theme);
      setExportResult(result);
      toast.success('HTML generated successfully!');
    } catch (error) {
      toast.error('Failed to generate HTML');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportReact = async () => {
    setIsExporting(true);
    setSelectedFormat('react');
    try {
      const result = await exportAsReact(portfolioData, theme);
      setExportResult(result);
      toast.success('React component generated successfully!');
    } catch (error) {
      toast.error('Failed to generate React component');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = async (format) => {
    try {
      const blob = await downloadPortfolio(portfolioData, theme, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = format === 'html' 
        ? `${portfolioData.personal.name.replace(/\s+/g, '_')}_portfolio.html`
        : 'Portfolio.jsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`${format.toUpperCase()} downloaded successfully!`);
    } catch (error) {
      toast.error('Failed to download file');
      console.error(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Export Portfolio</h1>
        <p className="text-gray-600">Download your portfolio in different formats</p>
      </div>

      {/* Export Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Static HTML Export */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileCode className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Static HTML</h3>
              <p className="text-sm text-gray-600">Single HTML file with inline CSS</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Export as a complete, self-contained HTML file that you can host anywhere.
            Perfect for simple hosting solutions.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleExportHTML}
              disabled={isExporting}
              className="btn btn-primary flex items-center space-x-2 flex-1"
            >
              {isExporting && selectedFormat === 'html' ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Code className="w-4 h-4" />
                  <span>Generate HTML</span>
                </>
              )}
            </button>
            {exportResult && selectedFormat === 'html' && (
              <button
                onClick={() => handleDownload('html')}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>

        {/* React Component Export */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">React Component</h3>
              <p className="text-sm text-gray-600">Reusable React JSX component</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Export as a React component that you can integrate into your existing React application.
            Includes separate CSS file.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleExportReact}
              disabled={isExporting}
              className="btn btn-primary flex items-center space-x-2 flex-1"
            >
              {isExporting && selectedFormat === 'react' ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Code className="w-4 h-4" />
                  <span>Generate React</span>
                </>
              )}
            </button>
            {exportResult && selectedFormat === 'react' && (
              <button
                onClick={() => handleDownload('react')}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Code Preview */}
      {exportResult && (
        <div className="bg-white rounded-lg shadow-md p-6 fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Generated Code Preview</h3>
            <button
              onClick={() => copyToClipboard(
                selectedFormat === 'html' 
                  ? exportResult.html 
                  : exportResult.component
              )}
              className="btn btn-sm btn-secondary"
            >
              Copy to Clipboard
            </button>
          </div>

          {selectedFormat === 'html' && (
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                {exportResult.html}
              </pre>
            </div>
          )}

          {selectedFormat === 'react' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Portfolio.jsx</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                    {exportResult.component}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Portfolio.css</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                    {exportResult.css}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">📚 Deployment Instructions</h3>
        <div className="space-y-4 text-blue-800">
          <div>
            <h4 className="font-semibold">Static HTML:</h4>
            <ul className="text-sm list-disc list-inside ml-2 space-y-1">
              <li>Upload the HTML file to any web host (GitHub Pages, Netlify, Vercel)</li>
              <li>Or open directly in a browser for local testing</li>
              <li>No build process required!</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">React Component:</h4>
            <ul className="text-sm list-disc list-inside ml-2 space-y-1">
              <li>Copy the component into your React project's components folder</li>
              <li>Import and use: <code className="bg-blue-100 px-1 rounded">import Portfolio from './Portfolio'</code></li>
              <li>Make sure to include the CSS file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;
