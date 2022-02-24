import { PlusIcon } from '@heroicons/react/outline';
import { UseFormReturn } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

export interface CreateJamFormProps {
  name: string;
  url: string;
}

interface Props {
  form: UseFormReturn<CreateJamFormProps, object>;
  onSubmit: (values: CreateJamFormProps) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const CreateJamForm = ({ form, isError, isLoading, onSubmit }: Props) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <span className="text-2xl font-bold">Ajouter un jam</span>
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-md">
            <div className="mb-4">
              <label htmlFor="name">Nom du jam</label>
              <input
                id="name"
                type="name"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom"
                {...form.register('name')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="url">Lien (url)</label>
              <input
                id="url"
                type="url"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom"
                {...form.register('url')}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mb-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <PlusIcon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Ajouter
            </button>

            {!isLoading && isError && <ErrorMessage />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJamForm;
