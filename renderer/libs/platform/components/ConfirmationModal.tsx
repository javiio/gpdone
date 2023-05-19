import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  showModal: boolean
  setShowModal: (show: boolean) => void
  onConfirm: () => void
}

export const ConfirmationModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  onConfirm,
}: Props) => {
  if (!showModal) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Transition.Root show={showModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => { setShowModal(false); }}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
            <div className="relative bg-white p-8 rounded-lg shadow-xl">
              <Dialog.Title as="h3" className="text-lg font-medium mb-4 text-slate-900">
                Are you sure you want to proceed?
              </Dialog.Title>

              <div className="flex justify-end">
                <button
                  className="inline-flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:text-gray-600 transition duration-150 ease-in-out"
                  onClick={() => { setShowModal(false); }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={handleConfirm}
                >
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Confirm
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
