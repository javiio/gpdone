import cn from 'classnames';
import { useProjects, type Project } from '../';

type Props = {
  selected: Project | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange(p: Project): void;
};

export function ProjectSelector({ selected, onChange }: Props) {
  const { projects } = useProjects();

  return (
    <ul className="text-sm flex space-x-2">
      {projects
        ?.sort((a, b) => (a?.order || 0) - (b?.order || 0))
        .map((project) => (
          <li
            key={project.id}
            className={cn(
              'border rounded-md overflow-hidden',
              `border-${project.color} bg-${project.color}/10`
            )}
          >
            {project.id === selected?.id ? (
              <div className={`px-2 py-1 bg-${project.color}/50`}>
                {project.name}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onChange(project)}
                className={`px-2 py-1 hover:bg-${project.color}/25`}
              >
                {project.name}
              </button>
            )}
          </li>
        ))}
    </ul>
  );
}
