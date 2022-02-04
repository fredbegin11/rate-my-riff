import { LockClosedIcon } from '@heroicons/react/outline';
import { UseFormReturn } from 'react-hook-form';

export interface CreateRiffFormProps {
  name: string;
  file: FileList;
}

interface Props {
  form: UseFormReturn<CreateRiffFormProps, object>;
  onSubmit: (values: CreateRiffFormProps) => Promise<void>;
  isLoading: boolean;
  error: string;
}

const CreateRiffForm = ({ form, error, isLoading, onSubmit }: Props) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name">Riff Name</label>
              <input
                id="name"
                type="name"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="name"
                {...form.register('name')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name">File</label>

              <input
                id="file"
                type="file"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="file"
                {...form.register('file')}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mb-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Save
            </button>
            {!isLoading && error && <span className="pt-6 text-rose-700">{error}</span>}
            {isLoading && <span className="pt-6">Ça load, sera pas long...</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRiffForm;
