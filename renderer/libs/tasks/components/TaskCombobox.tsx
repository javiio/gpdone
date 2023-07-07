import React, { Fragment, useState, useEffect, forwardRef, Ref } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useTasks, type Task } from '../';
import { type Project } from '~projects';

interface Props {
  value?: Task
  project?: Project
  onChange: (Task) => void
}

export const TaskCombobox = forwardRef((
  { value, project, onChange }: Props,
  ref: Ref<HTMLInputElement>
) => {
  const [query, setQuery] = useState('');
  const [color, setColor] = useState('gray-500');
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const { tasks } = useTasks();

  useEffect(() => {
    if (!project) {
      setAllTasks(tasks.filter((task) => !task.completed));
    } else {
      setAllTasks(tasks.filter((task) => !task.completed && task.projectId === project.id));
    }
    setColor(project?.color ?? 'gray-500');
  }, [tasks, project]);

  const filteredTasks =
    query === ''
      ? allTasks
      : allTasks.filter((task) =>
        task.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  return (
    <div className="">
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default text-left text-sm">
            <Combobox.Input
              className={`w-full border-none py-1.5 pl-3 pr-10 text-sm leading-5 bg-slate-800 rounded-md focus:outline focus:outline-${color}`}
              displayValue={(task: Task) => value ? task.title : ''}
              onChange={(event) => { setQuery(event.target.value); }}
              ref={ref}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => { setQuery(''); }}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 focus:outline-none sm:text-sm z-30">
              {filteredTasks.length === 0 && query !== ''
                ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                  )
                : (filteredTasks.map((task) => (
                    <Combobox.Option
                      key={task.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 text-slate-900 ${
                          active ? `bg-${color}/25` : ''
                        }`
                      }
                      value={task}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {task.title}
                          </span>
                          {selected
                            ? (
                              <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-${color}`}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              )
                            : null}
                        </>
                      )}
                    </Combobox.Option>
                  )))
              }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
});
TaskCombobox.displayName = 'TaskCombobox';
