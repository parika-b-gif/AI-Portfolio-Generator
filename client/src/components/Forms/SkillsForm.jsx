/**
 * Skills Form
 * Manage skills list
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const SkillsForm = () => {
  const { portfolioData, addSkill, deleteSkill } = usePortfolio();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const handleDelete = (index) => {
    deleteSkill(index);
    toast.info('Skill removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">Add your technical and professional skills</p>
      </div>

      {/* Add Skill Form */}
      <form onSubmit={handleAddSkill} className="flex space-x-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g., React, Node.js, Python"
          className="form-input flex-1"
        />
        <button
          type="submit"
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </form>

      {/* Skills List */}
      {portfolioData.skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {portfolioData.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full flex items-center space-x-2 fade-in"
            >
              <span className="font-medium">{skill}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Start adding your skills!</p>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Popular Skills</h4>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'Node.js', 'Python', 'HTML/CSS', 'Git', 'MongoDB', 'SQL'].map(skill => (
            <button
              key={skill}
              onClick={() => {
                addSkill(skill);
                toast.success(`${skill} added!`);
              }}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
