import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IconButton, Icon, useConfirmation } from '~platform';
import { useTask, type Task } from '../';

export const TaskActionsMenu = ({ task }: { task: Task }) => {
  const { remove } = useTask(task);
  const { confirm } = useConfirmation();

  const handleOnRemove = () => {
    confirm({ onConfirm: remove });
  };

  return (
    <Menu as="div" className="relative block text-left">
      <Menu.Button>
        <IconButton name="dots" size={6} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-purple-500 text-white' : 'text-slate-900'
                  } group flex w-full space-x-3 items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Icon name="pencil" size={3.5} />
                  <span>Edit</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleOnRemove}
                  className={`${
                    active ? 'bg-purple-500 text-white' : 'text-slate-900'
                  } group flex w-full space-x-3 items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Icon name="trash" size={3.5} />
                  <span>Delete</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
