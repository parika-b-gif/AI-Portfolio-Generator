/**
 * AI Routes
 * Handles all AI-related API endpoints
 */

const express = require('express');
const router = express.Router();
const aiService = require('../services/ai.service');

/**
 * POST /api/ai/enhance
 * Enhance single text content
 */
router.post('/enhance', async (req, res) => {
  try {
    const { text, type } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const result = await aiService.enhanceText(text, type);
    res.json(result);
  } catch (error) {
    console.error('Enhancement error:', error);
    res.status(500).json({ 
      error: 'Failed to enhance text',
      message: error.message 
    });
  }
});

/**
 * POST /api/ai/batch-enhance
 * Enhance multiple text contents
 */
router.post('/batch-enhance', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Items array is required' });
    }

    const results = await aiService.batchEnhance(items);
    res.json({ results });
  } catch (error) {
    console.error('Batch enhancement error:', error);
    res.status(500).json({ 
      error: 'Failed to enhance texts',
      message: error.message 
    });
  }
});

/**
 * POST /api/ai/generate-summary
 * Generate professional summary from profile data
 */
router.post('/generate-summary', async (req, res) => {
  try {
    const profileData = req.body;

    if (!profileData.name || !profileData.role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }

    const result = await aiService.generateSummary(profileData);
    res.json(result);
  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      message: error.message 
    });
  }
});

module.exports = router;
