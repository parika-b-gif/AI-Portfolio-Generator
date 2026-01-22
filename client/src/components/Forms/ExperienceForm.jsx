/**
 * Experience Form
 * Manage work experience entries
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { enhanceText } from '../../services/api';
import { Plus, Trash2, Edit2, Save, Sparkles, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const ExperienceForm = () => {
  const { portfolioData, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  });
  const [enhancedDesc, setEnhancedDesc] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', company: '', duration: '', description: '' });
    setEnhancedDesc(null);
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) {
      toast.error('Please fill required fields');
      return;
    }

    if (editIndex !== null) {
      updateExperience(editIndex, formData);
      toast.success('Experience updated!');
    } else {
      addExperience(formData);
      toast.success('Experience added!');
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(portfolioData.experience[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    deleteExperience(index);
    toast.info('Experience removed');
  };

  const handleEnhanceDescription = async () => {
    if (!formData.description) {
      toast.error('Please enter a description first');
      return;
    }

    setIsEnhancing(true);
    try {
      const result = await enhanceText(formData.description, 'experience');
      setEnhancedDesc(result);
      toast.success('Description enhanced!');
    } catch (error) {
      toast.error('Failed to enhance description');
    } finally {
      setIsEnhancing(false);
    }
  };

  const acceptEnhanced = () => {
    if (enhancedDesc) {
      setFormData({ ...formData, description: enhancedDesc.enhanced });
      setEnhancedDesc(null);
      toast.success('Enhanced description applied!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience</h2>
          <p className="text-gray-600">Add your professional work experience</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 space-y-4 fade-in">
          <div>
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Senior Software Engineer"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Company *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g., Tech Corp Inc."
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., Jan 2022 - Present"
              className="form-input"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="form-label">Description</label>
              <button
                type="button"
                onClick={handleEnhanceDescription}
                disabled={isEnhancing || !formData.description}
                className="btn btn-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEnhancing ? 'Enhancing...' : 'AI Enhance'}</span>
              </button>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your responsibilities and achievements"
              className="form-textarea"
              rows={4}
            />
          </div>

          {enhancedDesc && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4 fade-in">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-purple-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>AI Enhanced Version</span>
                </h4>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={acceptEnhanced}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnhancedDesc(null)}
                    className="btn btn-sm btn-secondary"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{enhancedDesc.enhanced}</p>
            </div>
          )}

          <div className="flex space-x-2">
            <button type="submit" className="btn btn-primary flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{editIndex !== null ? 'Update' : 'Add'}</span>
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {portfolioData.experience.length > 0 ? (
          portfolioData.experience.map((exp, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 fade-in">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.duration && <p className="text-sm text-gray-500">{exp.duration}</p>}
                  {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No experience added yet. Click "Add Experience" to start!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
