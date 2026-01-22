/**
 * Social Links Form
 * Manage social media and contact links
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Twitter, Globe, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

const SocialLinksForm = () => {
  const { portfolioData, updateSocial } = usePortfolio();
  const [formData, setFormData] = useState(portfolioData.social);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateSocial({ [name]: value });
  };

  const handleSave = () => {
    toast.success('Social links saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Links</h2>
        <p className="text-gray-600">Add your social media and contact information</p>
      </div>

      <div className="space-y-4">
        {/* GitHub */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Github className="w-5 h-5 text-gray-600" />
            <span>GitHub</span>
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="form-input"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Linkedin className="w-5 h-5 text-gray-600" />
            <span>LinkedIn</span>
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="form-input"
          />
        </div>

        {/* Twitter */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Twitter className="w-5 h-5 text-gray-600" />
            <span>Twitter/X</span>
          </label>
          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
            className="form-input"
          />
        </div>

        {/* Website */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <span>Personal Website</span>
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            className="form-input"
          />
        </div>

        {/* Email */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-600" />
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="form-input"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="btn btn-primary w-full"
      >
        Save Social Links
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Make sure to include full URLs (including https://)</li>
          <li>• Use your professional profiles for best impression</li>
          <li>• These links will appear in your portfolio and exports</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialLinksForm;
