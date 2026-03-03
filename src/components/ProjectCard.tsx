import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag } from 'lucide-react';
import { Project } from '../types/Project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="card overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="h-[100px] relative overflow-hidden shrink-0">
        <img
          src={project.groupImageURL}
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent opacity-50" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-600 px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-white">
            {project.teamId}
          </span>
          <span className="text-[10px] font-500 text-[var(--text-muted)]">
            {project.district}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[14px] font-600 text-white truncate mb-1">{project.title}</h3>

        {/* Category */}
        <p className="text-[11px] font-500 text-[var(--text-muted)] mb-4">{project.category}</p>

        {/* Button */}
        <Link to={`/project/${project.id}`} className="w-full mt-auto">
          <button className="btn-primary w-full py-2 text-[12px] font-600">
            Review Submission
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
