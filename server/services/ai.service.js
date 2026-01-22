/**
 * AI Service Module
 * Handles AI-powered content enhancement using OpenAI or mock service
 */

const OpenAI = require('openai');

class AIService {
  constructor() {
    this.useMock = process.env.USE_MOCK_AI === 'true';
    
    if (!this.useMock && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }

  /**
   * Enhance text content with AI
   * @param {string} text - Original text to enhance
   * @param {string} type - Type of content (bio, project, skill, etc.)
   * @returns {Promise<Object>} - Original and enhanced text
   */
  async enhanceText(text, type = 'general') {
    if (!text || text.trim().length === 0) {
      return {
        original: text,
        enhanced: text,
        suggestions: []
      };
    }

    if (this.useMock) {
      return this.mockEnhanceText(text, type);
    }

    try {
      const prompt = this.getPromptForType(type, text);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional portfolio content writer. Improve the given text to be more professional, clear, and compelling while maintaining the original meaning and keeping it concise."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const enhanced = completion.choices[0].message.content.trim();

      return {
        original: text,
        enhanced: enhanced,
        suggestions: this.generateSuggestions(text, enhanced)
      };
    } catch (error) {
      console.error('OpenAI API Error:', error.message);
      // Fallback to mock on error
      return this.mockEnhanceText(text, type);
    }
  }

  /**
   * Get appropriate prompt based on content type
   */
  getPromptForType(type, text) {
    const prompts = {
      bio: `Improve this professional bio to be more engaging and professional:\n\n${text}`,
      project: `Enhance this project description to highlight achievements and technical details:\n\n${text}`,
      skill: `Make this skill description more impactful and professional:\n\n${text}`,
      experience: `Improve this work experience description to emphasize achievements:\n\n${text}`,
      education: `Enhance this education description:\n\n${text}`,
      general: `Improve this text to be more professional and clear:\n\n${text}`
    };

    return prompts[type] || prompts.general;
  }

  /**
   * Mock AI enhancement for demo purposes
   */
  mockEnhanceText(text, type) {
    // Simple enhancement rules for demo
    let enhanced = text;

    // Capitalize first letter
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);

    // Add period if missing
    if (!enhanced.endsWith('.') && !enhanced.endsWith('!') && !enhanced.endsWith('?')) {
      enhanced += '.';
    }

    // Type-specific enhancements
    switch (type) {
      case 'bio':
        if (!enhanced.toLowerCase().includes('passionate') && !enhanced.toLowerCase().includes('experienced')) {
          enhanced = `Passionate and dedicated professional. ${enhanced}`;
        }
        break;
      case 'project':
        if (!enhanced.toLowerCase().includes('developed') && !enhanced.toLowerCase().includes('built')) {
          enhanced = enhanced.replace(/^/, 'Successfully developed ');
        }
        break;
      case 'skill':
        if (!enhanced.toLowerCase().includes('proficient') && !enhanced.toLowerCase().includes('experience')) {
          enhanced = `Proficient in ${enhanced.toLowerCase()}`;
        }
        break;
    }

    return {
      original: text,
      enhanced: enhanced,
      suggestions: [
        'Added professional tone',
        'Improved grammar and punctuation',
        'Enhanced clarity and impact'
      ]
    };
  }

  /**
   * Generate suggestions based on changes
   */
  generateSuggestions(original, enhanced) {
    const suggestions = [];

    if (enhanced.length > original.length) {
      suggestions.push('Expanded for clarity');
    }
    if (enhanced.length < original.length) {
      suggestions.push('Made more concise');
    }
    if (enhanced.charAt(0) !== original.charAt(0)) {
      suggestions.push('Improved opening');
    }
    if (!original.endsWith('.') && enhanced.endsWith('.')) {
      suggestions.push('Added proper punctuation');
    }

    return suggestions.length > 0 ? suggestions : ['Grammar and style improvements'];
  }

  /**
   * Batch enhance multiple texts
   */
  async batchEnhance(items) {
    const results = [];

    for (const item of items) {
      const result = await this.enhanceText(item.text, item.type);
      results.push({
        id: item.id,
        ...result
      });
    }

    return results;
  }

  /**
   * Generate professional summary from profile data
   */
  async generateSummary(profileData) {
    const { name, role, skills, experience } = profileData;

    if (this.useMock) {
      return {
        summary: `${name} is a ${role} with expertise in ${skills.slice(0, 3).join(', ')}. With ${experience?.length || 0} professional experiences, they bring a unique blend of technical skills and creative problem-solving to every project.`
      };
    }

    try {
      const prompt = `Generate a professional 2-3 sentence bio for:\nName: ${name}\nRole: ${role}\nSkills: ${skills.join(', ')}\nExperience: ${experience?.length || 0} positions`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional career coach. Write compelling, concise professional summaries."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      return {
        summary: completion.choices[0].message.content.trim()
      };
    } catch (error) {
      console.error('Error generating summary:', error.message);
      return {
        summary: `${name} is a ${role} with expertise in ${skills.slice(0, 3).join(', ')}.`
      };
    }
  }
}

module.exports = new AIService();
