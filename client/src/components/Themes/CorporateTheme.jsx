/**
 * Corporate Theme Component
 * Professional and business-oriented layout
 */

import React from 'react';

const CorporateTheme = ({ data }) => {
  const { personal, education, skills, projects, experience, certifications, social } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{personal.name || 'YOUR NAME'}</h1>
          <h2 className="text-xl text-gray-300 mb-4">{personal.role || 'Your Professional Role'}</h2>
          {personal.bio && <p className="text-gray-300 leading-relaxed">{personal.bio}</p>}
          {(social.github || social.linkedin) && (
            <div className="flex gap-6 mt-4">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer"
                   className="text-blue-400 hover:text-blue-300">
                  GitHub
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-blue-400 hover:text-blue-300">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-12 pb-8 border-b">
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-6">
              CORE COMPETENCIES
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-900 text-white text-center py-3 font-semibold">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-12 pb-8 border-b">
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-6">
              PROFESSIONAL EXPERIENCE
            </h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index}>
                  <h4 className="text-xl font-bold text-gray-900">{exp.title}</h4>
                  <p className="text-gray-700 font-semibold">{exp.company}</p>
                  {exp.duration && <p className="text-gray-600 text-sm">{exp.duration}</p>}
                  {exp.description && <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-12 pb-8 border-b">
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-6">
              KEY PROJECTS
            </h3>
            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={index}>
                  <h4 className="text-xl font-bold text-gray-900">{project.title}</h4>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                  {project.techStack && project.techStack.length > 0 && (
                    <p className="text-gray-600 text-sm mt-2">
                      <strong>Technologies:</strong> {project.techStack.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-12 pb-8 border-b">
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-6">
              EDUCATION
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.year && <p className="text-gray-600 text-sm">{edu.year}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-6">
              CERTIFICATIONS
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h4 className="text-lg font-bold text-gray-900">{cert.name}</h4>
                  <p className="text-gray-700">{cert.issuer} {cert.year && `| ${cert.year}`}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} {personal.name || 'Your Name'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CorporateTheme;
