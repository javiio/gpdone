import React, { Fragment } from 'react';
import cn from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '~platform';
import { useProjects, type Project } from '../';

interface Props {
  value: Project
  onChange: (project: Project) => void
}

export const ProjectCombobox = ({ value, onChange }: Props) => {
  const { projects } = useProjects();

  return (
    <Listbox value={value} onChange={onChange} horizontal>
      <div className="relative">
        <Listbox.Button className={cn(
          'relative cursor-default border rounded-md overflow-hidden py-[3px] pl-2 pr-4 w-24 h-6 text-xs focus:outline',
          `border-${value.color} bg-${value.color}/50 focus:outline-${value.color}`
        )}>
          <span className="block truncate">{value.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0.5">
            <Icon name="chevronUpDown" size={4} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-10 flex space-x-2 absolute -mt-6 overflow-auto rounded-md bg-slate-900 focus:outline-none">
            {projects.map((project, i) => (
              <Listbox.Option
                key={i}
                className={({ active, selected }) =>
                  `relative cursor-pointer select-none py-[3px] px-1 h-6 text-xs text-center rounded-md border border-${project.color} ${
                    active || selected ? `bg-${project.color}/50` : `bg-${project.color}/25`
                  }`
                }
                value={project}
              >
                {({ selected }) => (
                  <>
                    <div className="flex items-center">
                      {selected && (
                        <Icon name="check" size={3.5} />
                      )}
                      <span className="truncate block px-1">
                        {project.name}
                      </span>
                    </div>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
