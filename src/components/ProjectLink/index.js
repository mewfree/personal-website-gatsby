import React from 'react'

const ProjectLink = ({ project }) => (
  <div className="project-link">
    <div className="is-size-4 has-text-weight-semibold">
      <a href={ project.link }>
        { project.title }
      </a>
    </div>
    <div>
      { project.description }
    </div>
  </div>
)

export default ProjectLink
