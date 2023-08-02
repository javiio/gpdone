import React from 'react';
import { Disclosure as DisclosureUI, Transition } from '@headlessui/react';
import { Icon } from '../';

interface DisclosureProps {
  title: string
  children: React.ReactNode
};

export const Disclosure: React.FC<DisclosureProps> = ({ title, children }) => (
  <DisclosureUI>
    {({ open }) => (
      <>
        <DisclosureUI.Button className="flex w-full items-center space-x-2 mb-2 rounded-md text-left text-sm opacity-75 hover:text-yellow-500 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
          <Icon
            name="chevronRight"
            size={3}
            className={open ? 'rotate-90 transform' : ''}
          />
          <span>{title}</span>
        </DisclosureUI.Button>

        <Transition
          show={open}
          className="overflow-hidden"
          enter="transition-all ease-in-out duration-500"
          enterFrom="opacity-0 -translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 -translate-y-6"
        >
          <DisclosureUI.Panel>
            {children}
          </DisclosureUI.Panel>
        </Transition>
      </>
    )}
  </DisclosureUI>
);
