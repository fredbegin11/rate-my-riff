import { useForm } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CreateCommentForm, { CreateCommentFormProps } from './form/CreateCommentForm';
import madness from '../assets/madness.png';
import Riff from '../models/Riff';
import DateService from '../services/DateService';
import Lyrics from '../models/Lyrics';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
  item?: Riff | Lyrics;
  addComment: (riffId: string, form: CreateCommentFormProps) => Promise<void>;
  removeComment: (riffId: string, commentId: string) => Promise<void>;
}

export default function CommentsModal({ onConfirm, onCancel, visible, item, addComment, removeComment }: Props) {
  const form = useForm<CreateCommentFormProps>();

  const onSubmit = async (values: CreateCommentFormProps) => {
    await addComment(item!.id, values);
    form.reset();
  };

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onCancel}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="overflow-y-auto max-h-[90vh]">
                {item && item.comments.length > 0 && (
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:text-left w-full">
                        <Dialog.Title as="h3" className="leading-6 text-2xl font-bold text-gray-900">
                          Commentaires
                        </Dialog.Title>
                        {item.getOrderedComments().map((comment) => (
                          <div key={comment.id} className="flex flex-col mt-6 shadow-lg rounded-lg w-full p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <img className="h-12 w-12 rounded-full mr-2" src={madness} alt="" />

                                <div className="flex flex-col">
                                  <span className="font-semibold text-gray-800 pr-1">{comment.author}</span>
                                  <span className="font-sm text-gray-500">{DateService.format(comment.creationDate, 'yyyy/MM/dd HH:mm')}</span>
                                </div>
                              </div>
                              <button className="button" type="button" onClick={() => removeComment(item.id, comment.id)}>
                                <TrashIcon width={25} height={25} className="text-rose-700" />
                              </button>
                            </div>

                            <span className="mt-2 text-gray-800 whitespace-pre-wrap">{comment.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <CreateCommentForm form={form} onSubmit={onSubmit} onConfirm={onConfirm} onCancel={onCancel} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
