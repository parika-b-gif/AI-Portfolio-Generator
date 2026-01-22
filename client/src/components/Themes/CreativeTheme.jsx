/**
 * Creative Theme Component
 * Vibrant and artistic portfolio layout
 */

import React from 'react';

const CreativeTheme = ({ data }) => {
  const { personal, education, skills, projects, experience, certifications, social } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      {/* Header */}
      <header className="text-center pb-12 mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
          {personal.name || 'Your Name'}
        </h1>
        <h2 className="text-2xl text-purple-700 font-serif italic mb-4">
          {personal.role || 'Your Professional Role'}
        </h2>
        {personal.bio && (
          <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            {personal.bio}
          </p>
        )}
        {(social.github || social.linkedin || social.website) && (
          <div className="flex justify-center gap-6 mt-6">
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" 
                 className="text-purple-600 hover:text-purple-800 font-semibold">
                GitHub
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                 className="text-purple-600 hover:text-purple-800 font-semibold">
                LinkedIn
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer"
                 className="text-purple-600 hover:text-purple-800 font-semibold">
                Website
              </a>
            )}
          </div>
        )}
      </header>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span key={index} 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">Experience</h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900">{exp.title}</h4>
                <p className="text-purple-600 font-semibold">{exp.company}</p>
                {exp.duration && <p className="text-gray-500 text-sm">{exp.duration}</p>}
                {exp.description && <p className="text-gray-700 mt-3">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">Projects</h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900">{project.title}</h4>
                <p className="text-gray-700 mt-2">{project.description}</p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {(project.link || project.github) && (
                  <div className="flex gap-4 mt-3">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="text-purple-600 hover:underline font-semibold">
                        View Project →
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="text-purple-600 hover:underline font-semibold">
                        GitHub →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">Education</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                <p className="text-purple-600">{edu.institution}</p>
                {edu.year && <p className="text-gray-500 text-sm">{edu.year}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">Certifications</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900">{cert.name}</h4>
                <p className="text-purple-600">{cert.issuer}</p>
                {cert.year && <p className="text-gray-500 text-sm">{cert.year}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center pt-8 text-gray-600">
        <p>© {new Date().getFullYear()} {personal.name || 'Your Name'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreativeTheme;
