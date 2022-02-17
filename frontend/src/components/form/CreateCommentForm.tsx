import { UseFormReturn } from 'react-hook-form';

export interface CreateCommentFormProps {
  message: string;
}

interface Props {
  form: UseFormReturn<CreateCommentFormProps, object>;
  onSubmit: (values: CreateCommentFormProps) => Promise<void>;
  onConfirm: () => void;
  onCancel: () => void;
}

const CreateCommentForm = ({ form, onSubmit, onConfirm, onCancel }: Props) => {
  return (
    <div className="min-h-full flex items-center justify-center pt-12 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <span className="text-2xl font-bold">Ajouter un commentaire</span>
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-md">
            <div className="mb-4">
              <label htmlFor="instrument" className="font-semibold">
                Commentaire
              </label>
              <div className="inline-block relative w-full">
                <textarea
                  id="name"
                  required
                  className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Commentaire"
                  {...form.register('message')}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white py-3 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onConfirm}
              >
                Commenter
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onCancel}
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommentForm;
