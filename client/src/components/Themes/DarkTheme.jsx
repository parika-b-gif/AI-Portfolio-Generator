/**
 * Dark Theme Component
 * Terminal-style dark portfolio layout
 */

import React from 'react';

const DarkTheme = ({ data }) => {
  const { personal, education, skills, projects, experience, certifications, social } = data;

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      {/* Header */}
      <header className="mb-8 pb-6 border-b-2 border-green-500">
        <div className="flex items-center space-x-2 text-sm mb-4">
          <span className="text-green-500">user@portfolio:~$</span>
          <span className="text-green-400">cat profile.txt</span>
        </div>
        <h1 className="text-4xl font-bold text-green-400 mb-2 animate-pulse">
          {personal.name || '&gt; YOUR_NAME'}
        </h1>
        <h2 className="text-xl text-green-500 mb-4">
          {personal.role || '&gt; Your_Professional_Role'}
        </h2>
        {personal.bio && (
          <p className="text-green-300 leading-relaxed">{personal.bio}</p>
        )}
        {(social.github || social.linkedin) && (
          <div className="flex gap-6 mt-4 text-sm">
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer"
                 className="text-green-400 hover:text-green-300">
                [GitHub]
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                 className="text-green-400 hover:text-green-300">
                [LinkedIn]
              </a>
            )}
          </div>
        )}
      </header>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <span className="text-green-500">user@portfolio:~$</span>
            <span className="text-green-400">ls skills/</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-900 border border-green-500 text-green-400 px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <span className="text-green-500">user@portfolio:~$</span>
            <span className="text-green-400">cat experience.log</span>
          </div>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-900 border-l-4 border-green-500 p-4">
                <h4 className="text-lg font-bold text-green-400">&gt; {exp.title}</h4>
                <p className="text-green-500">{exp.company}</p>
                {exp.duration && <p className="text-green-600 text-sm">[{exp.duration}]</p>}
                {exp.description && <p className="text-green-300 mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <span className="text-green-500">user@portfolio:~$</span>
            <span className="text-green-400">ls projects/</span>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 border-l-4 border-green-500 p-4">
                <h4 className="text-lg font-bold text-green-400">&gt; {project.title}</h4>
                <p className="text-green-300 mt-2">{project.description}</p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-green-500 text-sm border border-green-600 px-2 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {(project.link || project.github) && (
                  <div className="flex gap-4 mt-2 text-sm">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="text-green-400 hover:text-green-300">
                        [demo] →
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="text-green-400 hover:text-green-300">
                        [source] →
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
        <section className="mb-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <span className="text-green-500">user@portfolio:~$</span>
            <span className="text-green-400">cat education.txt</span>
          </div>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-green-600 pl-4">
                <h4 className="text-lg font-bold text-green-400">{edu.degree}</h4>
                <p className="text-green-500">{edu.institution}</p>
                {edu.year && <p className="text-green-600 text-sm">[{edu.year}]</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <span className="text-green-500">user@portfolio:~$</span>
            <span className="text-green-400">ls certifications/</span>
          </div>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="border-l-2 border-green-600 pl-4">
                <h4 className="text-lg font-bold text-green-400">{cert.name}</h4>
                <p className="text-green-500">{cert.issuer} {cert.year && `[${cert.year}]`}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t-2 border-green-500 text-center text-green-600">
        <p>&gt; © {new Date().getFullYear()} {personal.name || 'Your Name'} | All rights reserved</p>
      </footer>
    </div>
  );
};

export default DarkTheme;
