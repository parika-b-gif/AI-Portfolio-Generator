/**
 * Builder Page
 * Main page for creating and editing portfolio content
 */

import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import PersonalInfoForm from '../components/Forms/PersonalInfoForm';
import EducationForm from '../components/Forms/EducationForm';
import SkillsForm from '../components/Forms/SkillsForm';
import ProjectsForm from '../components/Forms/ProjectsForm';
import ExperienceForm from '../components/Forms/ExperienceForm';
import CertificationsForm from '../components/Forms/CertificationsForm';
import SocialLinksForm from '../components/Forms/SocialLinksForm';
import PortfolioPreview from '../components/Preview/PortfolioPreview';
import { User, GraduationCap, Wrench, Briefcase, Award, Link, Code } from 'lucide-react';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'skills', label: 'Skills', icon: Wrench, component: SkillsForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'projects', label: 'Projects', icon: Code, component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
  { id: 'social', label: 'Social Links', icon: Link, component: SocialLinksForm },
];

const Builder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const { previewMode } = usePortfolio();

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Sections</h2>
          <nav className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={previewMode ? 'lg:col-span-5' : 'lg:col-span-9'}>
        <div className="bg-white rounded-lg shadow-md p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>

      {/* Live Preview (conditional) */}
      {previewMode && (
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Live Preview</h3>
              <div className="border rounded-lg overflow-hidden" style={{ height: '600px', overflowY: 'auto' }}>
                <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%', height: '166.67%' }}>
                  <PortfolioPreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
