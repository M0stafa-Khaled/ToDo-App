import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  closeModal,
  title,
  description,
  children,
}: IProps) {
  return (
    <div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={closeModal}
        >
          <div className="fixed bg-gray-800/40 backdrop-blur-sm inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-[#1d2429fb] backdrop-blur-md p-6 border-[0.5px] border-gray-700">
                  <div className="flex justify-between">
                    {title && (
                      <DialogTitle
                        as="h3"
                        className="text-xl text-white font-medium"
                      >
                        {title}
                      </DialogTitle>
                    )}
                  </div>
                  {description && (
                    <Description className="text-base mt-3 text-gray-400">
                      {description}
                    </Description>
                  )}

                  <div className="mt-4">{children}</div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
