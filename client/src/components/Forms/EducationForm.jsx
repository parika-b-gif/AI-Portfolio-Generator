/**
 * Education Form
 * Manage education entries
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const EducationForm = () => {
  const { portfolioData, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    year: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({ degree: '', institution: '', year: '', description: '' });
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.degree || !formData.institution) {
      toast.error('Please fill required fields');
      return;
    }

    if (editIndex !== null) {
      updateEducation(editIndex, formData);
      toast.success('Education updated!');
    } else {
      addEducation(formData);
      toast.success('Education added!');
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(portfolioData.education[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    deleteEducation(index);
    toast.info('Education removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">Add your educational background</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 space-y-4 fade-in">
          <div>
            <label className="form-label">Degree/Certification *</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g., Bachelor of Science in Computer Science"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Institution *</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="e.g., University of Technology"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="e.g., 2020 - 2024"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details, achievements, GPA, etc."
              className="form-textarea"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <button type="submit" className="btn btn-primary flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{editIndex !== null ? 'Update' : 'Add'}</span>
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {portfolioData.education.length > 0 ? (
          portfolioData.education.map((edu, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 fade-in">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                  {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet. Click "Add Education" to start!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
