import { UseFormReturn } from 'react-hook-form';
import SubmitButton from '../SubmitButton';
import ErrorMessage from './ErrorMessage';

export interface CreateLyricsFormProps {
  name: string;
  lyrics: string;
}

interface Props {
  form: UseFormReturn<CreateLyricsFormProps, object>;
  onSubmit: (values: CreateLyricsFormProps) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const CreateLyricsForm = ({ form, isError, isLoading, onSubmit }: Props) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <span className="text-2xl font-bold">Ajouter des lyrics</span>
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-md">
            <div className="mb-4">
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom"
                {...form.register('name')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instrument">Paroles</label>
              <div className="inline-block relative w-full">
                <textarea
                  id="name"
                  required
                  className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Paroles"
                  {...form.register('lyrics')}
                />
              </div>
            </div>
          </div>

          <div>
            <SubmitButton label="Ajouter" type="Add" isLoading={isLoading} />
            {!isLoading && isError && <ErrorMessage />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLyricsForm;
