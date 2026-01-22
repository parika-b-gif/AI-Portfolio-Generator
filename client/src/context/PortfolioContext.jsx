/**
 * Portfolio Context
 * Manages global state for portfolio data, theme, and preview
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  // Portfolio data state
  const [portfolioData, setPortfolioData] = useState({
    personal: {
      name: '',
      role: '',
      bio: '',
      email: '',
      phone: '',
      location: ''
    },
    education: [],
    skills: [],
    projects: [],
    experience: [],
    certifications: [],
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
      email: ''
    }
  });

  // Theme state
  const [theme, setTheme] = useState('minimal');

  // Preview mode state
  const [previewMode, setPreviewMode] = useState(true);

  // Loading states
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    const savedTheme = localStorage.getItem('portfolioTheme');

    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
  }, [theme]);

  // Update personal info
  const updatePersonal = (data) => {
    setPortfolioData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...data }
    }));
  };

  // Update education
  const addEducation = (edu) => {
    setPortfolioData(prev => ({
      ...prev,
      education: [...prev.education, edu]
    }));
  };

  const updateEducation = (index, edu) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.map((item, i) => i === index ? edu : item)
    }));
  };

  const deleteEducation = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Update skills
  const addSkill = (skill) => {
    if (skill && !portfolioData.skills.includes(skill)) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const deleteSkill = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Update projects
  const addProject = (project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (index, project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map((item, i) => i === index ? project : item)
    }));
  };

  const deleteProject = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Update experience
  const addExperience = (exp) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: [...prev.experience, exp]
    }));
  };

  const updateExperience = (index, exp) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.map((item, i) => i === index ? exp : item)
    }));
  };

  const deleteExperience = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // Update certifications
  const addCertification = (cert) => {
    setPortfolioData(prev => ({
      ...prev,
      certifications: [...prev.certifications, cert]
    }));
  };

  const updateCertification = (index, cert) => {
    setPortfolioData(prev => ({
      ...prev,
      certifications: prev.certifications.map((item, i) => i === index ? cert : item)
    }));
  };

  const deleteCertification = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Update social links
  const updateSocial = (data) => {
    setPortfolioData(prev => ({
      ...prev,
      social: { ...prev.social, ...data }
    }));
  };

  // Clear all data
  const clearAllData = () => {
    setPortfolioData({
      personal: {
        name: '',
        role: '',
        bio: '',
        email: '',
        phone: '',
        location: ''
      },
      education: [],
      skills: [],
      projects: [],
      experience: [],
      certifications: [],
      social: {
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        email: ''
      }
    });
    localStorage.removeItem('portfolioData');
  };

  const value = {
    portfolioData,
    theme,
    previewMode,
    isEnhancing,
    setTheme,
    setPreviewMode,
    setIsEnhancing,
    updatePersonal,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addCertification,
    updateCertification,
    deleteCertification,
    updateSocial,
    clearAllData
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
