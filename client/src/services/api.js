/**
 * API Service
 * Handles all API calls to the backend
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// AI Enhancement Services
export const enhanceText = async (text, type = 'general') => {
  try {
    const response = await api.post('/ai/enhance', { text, type });
    return response.data;
  } catch (error) {
    console.error('Error enhancing text:', error);
    throw error;
  }
};

export const batchEnhanceTexts = async (items) => {
  try {
    const response = await api.post('/ai/batch-enhance', { items });
    return response.data;
  } catch (error) {
    console.error('Error batch enhancing:', error);
    throw error;
  }
};

export const generateSummary = async (profileData) => {
  try {
    const response = await api.post('/ai/generate-summary', profileData);
    return response.data;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

// Export Services
export const exportAsHTML = async (portfolioData, theme) => {
  try {
    const response = await api.post('/export/html', { portfolioData, theme });
    return response.data;
  } catch (error) {
    console.error('Error exporting HTML:', error);
    throw error;
  }
};

export const exportAsReact = async (portfolioData, theme) => {
  try {
    const response = await api.post('/export/react', { portfolioData, theme });
    return response.data;
  } catch (error) {
    console.error('Error exporting React:', error);
    throw error;
  }
};

export const downloadPortfolio = async (portfolioData, theme, format) => {
  try {
    const response = await api.post('/export/download', 
      { portfolioData, theme, format },
      { responseType: 'blob' }
    );
    return response.data;
  } catch (error) {
    console.error('Error downloading portfolio:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default api;
