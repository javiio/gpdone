import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconButton, Button } from '~platform';

interface Props {
  showModal: boolean
  title: string
  onConfirm: () => Promise<void>
  onCancel: () => void
  isConfirmLoading?: boolean
}

export const ConfirmationModal: React.FC<Props> = ({
  showModal,
  title,
  onConfirm,
  onCancel,
  isConfirmLoading,
}: Props) => {
  if (!showModal) {
    return null;
  }

  return (
    <Transition.Root show={showModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCancel}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-white px-4 pt-8 pb-4 rounded-lg shadow-xl w-96 mx-auto mt-28">
            <Dialog.Title as="h3" className="mb-4 text-slate-900">
              {title}
            </Dialog.Title>

            <IconButton
              name="x"
              onClick={onCancel}
              size={6}
              className="text-slate-900 absolute top-1 right-1"
            />

            <div className="flex justify-end space-x-4 mt-6">
              <Button onClick={onCancel} variant="link" theme="light">
                Cancel
              </Button>
              <Button onClick={onConfirm} isLoading={isConfirmLoading}>
                Confirm
              </Button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
