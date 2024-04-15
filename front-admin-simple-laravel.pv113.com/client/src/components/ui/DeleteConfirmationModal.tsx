import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Button } from "./Button.tsx";

type DeleteConfirmationModalProps = {
    open: boolean;
    close: () => void;
    onConfirmDelete: () => void;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, close, onConfirmDelete }) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={close}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Confirm Delete
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this category?
                                </p>
                            </div>

                            <div className="mt-4 flex justify-center space-x-4">
                                <Button onClick={onConfirmDelete} variant="contained" color="red">
                                    Delete
                                </Button>
                                <Button onClick={close} variant="outlined">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteConfirmationModal;
