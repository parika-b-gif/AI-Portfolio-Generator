/**
 * Certifications Form
 * Manage certifications and achievements
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const CertificationsForm = () => {
  const { portfolioData, addCertification, updateCertification, deleteCertification } = usePortfolio();
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    year: '',
    credentialId: ''
  });

  const resetForm = () => {
    setFormData({ name: '', issuer: '', year: '', credentialId: '' });
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.issuer) {
      toast.error('Please fill required fields');
      return;
    }

    if (editIndex !== null) {
      updateCertification(editIndex, formData);
      toast.success('Certification updated!');
    } else {
      addCertification(formData);
      toast.success('Certification added!');
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(portfolioData.certifications[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    deleteCertification(index);
    toast.info('Certification removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
          <p className="text-gray-600">Add your professional certifications</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Certification</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 space-y-4 fade-in">
          <div>
            <label className="form-label">Certification Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., AWS Certified Developer"
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Issuing Organization *</label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="e.g., Amazon Web Services"
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
              placeholder="e.g., 2024"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Credential ID (Optional)</label>
            <input
              type="text"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              placeholder="Certification ID or link"
              className="form-input"
            />
          </div>

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

      {/* Certifications List */}
      <div className="space-y-4">
        {portfolioData.certifications.length > 0 ? (
          portfolioData.certifications.map((cert, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 fade-in">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  {cert.year && <p className="text-sm text-gray-500">{cert.year}</p>}
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500 mt-1">ID: {cert.credentialId}</p>
                  )}
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
            <p>No certifications added yet. Click "Add Certification" to start!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationsForm;
