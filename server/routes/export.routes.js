/**
 * Export Routes
 * Handles portfolio export endpoints
 */

const express = require('express');
const router = express.Router();
const exportService = require('../services/export.service');

/**
 * POST /api/export/html
 * Generate static HTML portfolio
 */
router.post('/html', async (req, res) => {
  try {
    const { portfolioData, theme } = req.body;

    if (!portfolioData) {
      return res.status(400).json({ error: 'Portfolio data is required' });
    }

    const html = await exportService.generateHTML(portfolioData, theme || 'minimal');
    
    res.json({ 
      html,
      success: true 
    });
  } catch (error) {
    console.error('HTML export error:', error);
    res.status(500).json({ 
      error: 'Failed to generate HTML',
      message: error.message 
    });
  }
});

/**
 * POST /api/export/react
 * Generate React component
 */
router.post('/react', async (req, res) => {
  try {
    const { portfolioData, theme } = req.body;

    if (!portfolioData) {
      return res.status(400).json({ error: 'Portfolio data is required' });
    }

    const result = await exportService.generateReact(portfolioData, theme || 'minimal');
    
    res.json({ 
      ...result,
      success: true 
    });
  } catch (error) {
    console.error('React export error:', error);
    res.status(500).json({ 
      error: 'Failed to generate React component',
      message: error.message 
    });
  }
});

/**
 * POST /api/export/download
 * Generate downloadable file
 */
router.post('/download', async (req, res) => {
  try {
    const { portfolioData, theme, format } = req.body;

    if (!portfolioData) {
      return res.status(400).json({ error: 'Portfolio data is required' });
    }

    let content;
    let filename;
    let contentType;

    if (format === 'html') {
      content = await exportService.generateHTML(portfolioData, theme);
      filename = `${portfolioData.personal.name.replace(/\s+/g, '_')}_portfolio.html`;
      contentType = 'text/html';
    } else if (format === 'react') {
      const result = await exportService.generateReact(portfolioData, theme);
      content = result.component;
      filename = 'Portfolio.jsx';
      contentType = 'text/plain';
    } else {
      return res.status(400).json({ error: 'Invalid format. Use "html" or "react"' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(content);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ 
      error: 'Failed to generate download',
      message: error.message 
    });
  }
});

module.exports = router;
