/**
 * Minimal Theme Component
 * Clean and simple portfolio layout
 */

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github } from 'lucide-react';

const MinimalTheme = ({ data }) => {
  const { personal, education, skills, projects, experience, certifications, social } = data;

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Header */}
      <header className="text-center pb-8 border-b-2 border-gray-200 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.name || 'Your Name'}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{personal.role || 'Your Professional Role'}</h2>
        {personal.bio && <p className="text-gray-700 max-w-2xl mx-auto">{personal.bio}</p>}
        
        {/* Contact Info */}
        <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {personal.email && (
            <span className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{personal.location}</span>
            </span>
          )}
        </div>

        {/* Social Links */}
        {(social.github || social.linkedin || social.website) && (
          <div className="flex justify-center gap-4 mt-4">
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                GitHub
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                LinkedIn
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Website
              </a>
            )}
          </div>
        )}
      </header>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                <p className="text-gray-600">{exp.company}{exp.duration && ` | ${exp.duration}`}</p>
                {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Projects</h3>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                <p className="text-gray-700 mt-1">{project.description}</p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-2">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center space-x-1">
                      <ExternalLink className="w-4 h-4" />
                      <span>View Project</span>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center space-x-1">
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Education</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}{edu.year && ` | ${edu.year}`}</p>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Certifications</h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h4 className="text-lg font-semibold text-gray-900">{cert.name}</h4>
                <p className="text-gray-600">{cert.issuer}{cert.year && ` | ${cert.year}`}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center pt-8 border-t border-gray-200 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} {personal.name || 'Your Name'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MinimalTheme;
