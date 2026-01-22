/**
 * Projects Form
 * Manage project portfolio
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { enhanceText } from '../../services/api';
import { Plus, Trash2, Edit2, Save, Sparkles, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

const ProjectsForm = () => {
  const { portfolioData, addProject, updateProject, deleteProject } = usePortfolio();
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    link: '',
    github: ''
  });
  const [techInput, setTechInput] = useState('');
  const [enhancedDesc, setEnhancedDesc] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: [], link: '', github: '' });
    setTechInput('');
    setEnhancedDesc(null);
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill required fields');
      return;
    }

    if (editIndex !== null) {
      updateProject(editIndex, formData);
      toast.success('Project updated!');
    } else {
      addProject(formData);
      toast.success('Project added!');
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(portfolioData.projects[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    deleteProject(index);
    toast.info('Project removed');
  };

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTech = (index) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index)
    });
  };

  const handleEnhanceDescription = async () => {
    if (!formData.description) {
      toast.error('Please enter a description first');
      return;
    }

    setIsEnhancing(true);
    try {
      const result = await enhanceText(formData.description, 'project');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600">Showcase your best work</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 space-y-4 fade-in">
          <div>
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., E-commerce Platform"
              className="form-input"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="form-label">Description *</label>
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
              placeholder="Describe your project and its impact"
              className="form-textarea"
              rows={4}
              required
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

          <div>
            <label className="form-label">Tech Stack</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="e.g., React"
                className="form-input flex-1"
              />
              <button
                type="button"
                onClick={addTech}
                className="btn btn-secondary"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTech(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Project Link</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://project-demo.com"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">GitHub Link</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/username/repo"
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

      {/* Projects List */}
      <div className="space-y-4">
        {portfolioData.projects.length > 0 ? (
          portfolioData.projects.map((project, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 fade-in">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex space-x-4 mt-2">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        Live Demo →
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        GitHub →
                      </a>
                    )}
                  </div>
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
            <p>No projects added yet. Click "Add Project" to showcase your work!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;
