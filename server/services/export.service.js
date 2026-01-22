/**
 * Export Service
 * Handles generation of HTML, React, and PDF exports
 */

const fs = require('fs').promises;
const path = require('path');

class ExportService {
  constructor() {
    this.exportsDir = path.join(__dirname, '../exports');
    this.ensureExportsDir();
  }

  async ensureExportsDir() {
    try {
      await fs.access(this.exportsDir);
    } catch {
      await fs.mkdir(this.exportsDir, { recursive: true });
    }
  }

  /**
   * Generate static HTML/CSS/JS portfolio
   */
  async generateHTML(portfolioData, theme) {
    const { personal, education, skills, projects, experience, certifications, social } = portfolioData;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personal.name} - Portfolio</title>
    <style>
        ${this.getThemeCSS(theme)}
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <h1>${personal.name}</h1>
            <h2>${personal.role}</h2>
            <p class="bio">${personal.bio}</p>
            <div class="social-links">
                ${this.generateSocialLinks(social)}
            </div>
        </header>

        <!-- Skills -->
        ${skills && skills.length > 0 ? `
        <section class="section">
            <h3>Skills</h3>
            <div class="skills-grid">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Experience -->
        ${experience && experience.length > 0 ? `
        <section class="section">
            <h3>Experience</h3>
            ${experience.map(exp => `
                <div class="experience-item">
                    <h4>${exp.title}</h4>
                    <p class="company">${exp.company} | ${exp.duration}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </section>
        ` : ''}

        <!-- Projects -->
        ${projects && projects.length > 0 ? `
        <section class="section">
            <h3>Projects</h3>
            ${projects.map(project => `
                <div class="project-item">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}

        <!-- Education -->
        ${education && education.length > 0 ? `
        <section class="section">
            <h3>Education</h3>
            ${education.map(edu => `
                <div class="education-item">
                    <h4>${edu.degree}</h4>
                    <p>${edu.institution} | ${edu.year}</p>
                </div>
            `).join('')}
        </section>
        ` : ''}

        <!-- Certifications -->
        ${certifications && certifications.length > 0 ? `
        <section class="section">
            <h3>Certifications</h3>
            ${certifications.map(cert => `
                <div class="cert-item">
                    <h4>${cert.name}</h4>
                    <p>${cert.issuer} | ${cert.year}</p>
                </div>
            `).join('')}
        </section>
        ` : ''}

        <footer>
            <p>© ${new Date().getFullYear()} ${personal.name}. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`;

    return html;
  }

  /**
   * Generate theme-specific CSS
   */
  getThemeCSS(theme = 'minimal') {
    const themes = {
      minimal: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; background: white; }
        .header { text-align: center; padding: 40px 0; border-bottom: 2px solid #eee; }
        h1 { font-size: 2.5rem; margin-bottom: 10px; }
        h2 { font-size: 1.5rem; color: #666; font-weight: 400; }
        .bio { margin: 20px 0; font-size: 1.1rem; color: #555; }
        .social-links { margin-top: 20px; }
        .social-links a { margin: 0 10px; color: #0066cc; text-decoration: none; }
        .section { margin: 40px 0; }
        .section h3 { font-size: 1.8rem; margin-bottom: 20px; color: #222; border-left: 4px solid #0066cc; padding-left: 15px; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-tag { background: #e8f4fd; color: #0066cc; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; }
        .experience-item, .project-item, .education-item, .cert-item { margin-bottom: 25px; padding: 20px; border-left: 3px solid #eee; }
        .experience-item h4, .project-item h4 { font-size: 1.3rem; margin-bottom: 5px; }
        .company { color: #666; font-style: italic; margin-bottom: 10px; }
        .tech-stack { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
        .tech-tag { background: #f0f0f0; padding: 5px 12px; border-radius: 15px; font-size: 0.85rem; }
        .project-link { display: inline-block; margin-top: 10px; color: #0066cc; text-decoration: none; font-weight: 600; }
        footer { text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; color: #999; }
      `,
      creative: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; line-height: 1.8; color: #2c3e50; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { max-width: 1000px; margin: 40px auto; padding: 50px; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .header { text-align: center; padding: 50px 0; }
        h1 { font-size: 3rem; margin-bottom: 10px; color: #667eea; font-weight: 700; }
        h2 { font-size: 1.5rem; color: #764ba2; font-weight: 400; font-style: italic; }
        .bio { margin: 25px 0; font-size: 1.2rem; color: #555; }
        .social-links a { margin: 0 15px; color: #667eea; text-decoration: none; font-weight: 600; }
        .section { margin: 50px 0; }
        .section h3 { font-size: 2rem; margin-bottom: 25px; color: #667eea; text-align: center; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }
        .skill-tag { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 25px; font-weight: 600; }
        .experience-item, .project-item { margin-bottom: 30px; padding: 25px; background: #f8f9fa; border-radius: 15px; }
        .project-link { color: #667eea; font-weight: 600; }
        footer { text-align: center; margin-top: 60px; color: #999; }
      `,
      corporate: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.7; color: #1a1a1a; background: #ffffff; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0; }
        .header { background: #1a1a1a; color: white; padding: 60px 40px; }
        h1 { font-size: 2.8rem; margin-bottom: 10px; font-weight: 700; }
        h2 { font-size: 1.4rem; color: #cccccc; font-weight: 400; }
        .bio { margin: 25px 0; font-size: 1.1rem; color: #dddddd; }
        .social-links a { color: #4a90e2; margin: 0 15px; }
        .section { padding: 50px 40px; border-bottom: 1px solid #eee; }
        .section h3 { font-size: 1.8rem; margin-bottom: 30px; color: #1a1a1a; text-transform: uppercase; letter-spacing: 2px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
        .skill-tag { background: #1a1a1a; color: white; padding: 12px 20px; text-align: center; font-weight: 600; }
        .experience-item, .project-item { margin-bottom: 30px; padding-bottom: 25px; border-bottom: 1px solid #eee; }
        footer { padding: 30px; text-align: center; background: #1a1a1a; color: white; }
      `,
      dark: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', monospace; line-height: 1.6; color: #e0e0e0; background: #0a0a0a; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; padding: 40px 0; border-bottom: 2px solid #00ff00; }
        h1 { font-size: 2.5rem; margin-bottom: 10px; color: #00ff00; text-shadow: 0 0 10px #00ff00; }
        h2 { font-size: 1.5rem; color: #00cc00; }
        .bio { margin: 20px 0; font-size: 1.1rem; color: #cccccc; }
        .social-links a { margin: 0 10px; color: #00ff00; text-decoration: none; }
        .section { margin: 40px 0; }
        .section h3 { font-size: 1.8rem; margin-bottom: 20px; color: #00ff00; border-left: 4px solid #00ff00; padding-left: 15px; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-tag { background: #1a1a1a; color: #00ff00; padding: 8px 16px; border: 1px solid #00ff00; font-size: 0.9rem; }
        .experience-item, .project-item { margin-bottom: 25px; padding: 20px; background: #1a1a1a; border-left: 3px solid #00ff00; }
        .tech-tag { background: #0a0a0a; color: #00cc00; padding: 5px 12px; border: 1px solid #00cc00; font-size: 0.85rem; }
        .project-link { color: #00ff00; }
        footer { text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #00ff00; color: #00cc00; }
      `
    };

    return themes[theme] || themes.minimal;
  }

  /**
   * Generate social links HTML
   */
  generateSocialLinks(social) {
    if (!social) return '';

    const links = [];
    if (social.github) links.push(`<a href="${social.github}" target="_blank">GitHub</a>`);
    if (social.linkedin) links.push(`<a href="${social.linkedin}" target="_blank">LinkedIn</a>`);
    if (social.twitter) links.push(`<a href="${social.twitter}" target="_blank">Twitter</a>`);
    if (social.email) links.push(`<a href="mailto:${social.email}">Email</a>`);
    if (social.website) links.push(`<a href="${social.website}" target="_blank">Website</a>`);

    return links.join(' | ');
  }

  /**
   * Generate React component code
   */
  async generateReact(portfolioData, theme) {
    const componentCode = `import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const data = ${JSON.stringify(portfolioData, null, 2)};

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="portfolio-header">
        <h1>{data.personal.name}</h1>
        <h2>{data.personal.role}</h2>
        <p className="bio">{data.personal.bio}</p>
        <div className="social-links">
          {data.social?.github && <a href={data.social.github}>GitHub</a>}
          {data.social?.linkedin && <a href={data.social.linkedin}>LinkedIn</a>}
          {data.social?.email && <a href={\`mailto:\${data.social.email}\`}>Email</a>}
        </div>
      </header>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="portfolio-section">
          <h3>Skills</h3>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="portfolio-section">
          <h3>Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h4>{exp.title}</h4>
              <p className="company">{exp.company} | {exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="portfolio-section">
          <h3>Projects</h3>
          {data.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project →
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="portfolio-section">
          <h3>Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h4>{edu.degree}</h4>
              <p>{edu.institution} | {edu.year}</p>
            </div>
          ))}
        </section>
      )}

      <footer>
        <p>© {new Date().getFullYear()} {data.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;`;

    const cssCode = this.getThemeCSS(theme);

    return {
      component: componentCode,
      css: cssCode
    };
  }
}

module.exports = new ExportService();
