/**
 * Personal Info Form
 * Collects basic personal information
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { enhanceText } from '../../services/api';
import { Sparkles, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const PersonalInfoForm = () => {
  const { portfolioData, updatePersonal } = usePortfolio();
  const { personal } = portfolioData;

  const [formData, setFormData] = useState(personal);
  const [enhancedBio, setEnhancedBio] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updatePersonal({ [name]: value });
  };

  const handleEnhanceBio = async () => {
    if (!formData.bio || formData.bio.trim().length === 0) {
      toast.error('Please enter a bio first');
      return;
    }

    setIsEnhancing(true);
    try {
      const result = await enhanceText(formData.bio, 'bio');
      setEnhancedBio(result);
      toast.success('Bio enhanced! Review and accept changes.');
    } catch (error) {
      toast.error('Failed to enhance bio. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const acceptEnhanced = () => {
    if (enhancedBio) {
      setFormData(prev => ({ ...prev, bio: enhancedBio.enhanced }));
      updatePersonal({ bio: enhancedBio.enhanced });
      setEnhancedBio(null);
      toast.success('Enhanced bio applied!');
    }
  };

  const rejectEnhanced = () => {
    setEnhancedBio(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className="form-input"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="form-label">Professional Role *</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Full Stack Developer"
            className="form-input"
            required
          />
        </div>

        {/* Bio with AI Enhancement */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="form-label">Professional Bio *</label>
            <button
              type="button"
              onClick={handleEnhanceBio}
              disabled={isEnhancing || !formData.bio}
              className="btn btn-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEnhancing ? 'Enhancing...' : 'AI Enhance'}</span>
            </button>
          </div>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a brief bio about yourself. AI will help make it professional!"
            className="form-textarea"
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-1">Write naturally - AI will help polish it!</p>
        </div>

        {/* AI Enhancement Preview */}
        {enhancedBio && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4 fade-in">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-purple-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Enhanced Version</span>
              </h4>
              <div className="flex space-x-2">
                <button
                  onClick={acceptEnhanced}
                  className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={rejectEnhanced}
                  className="btn btn-sm btn-secondary"
                >
                  Reject
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{enhancedBio.enhanced}</p>
            {enhancedBio.suggestions && enhancedBio.suggestions.length > 0 && (
              <div className="mt-2 pt-2 border-t border-purple-200">
                <p className="text-xs font-medium text-purple-800 mb-1">Changes made:</p>
                <ul className="text-xs text-purple-700 space-y-0.5">
                  {enhancedBio.suggestions.map((suggestion, idx) => (
                    <li key={idx}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="form-input"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className="form-input"
          />
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
