import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({
  projects,
  name,
  description,
  repo_link,
  showTitle = true,
  showUsername = true,
}) => {
  if (!name.length) {
    return <h3>No Starred Projects</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{name}</h3>}
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${project.githubUser}`}
                >
                  {project.githubUser} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Description {description}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                  Description {description}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{project.description}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/projects/${project._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
