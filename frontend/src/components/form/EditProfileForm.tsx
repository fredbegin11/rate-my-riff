import { UseFormReturn } from 'react-hook-form';
import { SaveIcon } from '@heroicons/react/outline';
import madness from '../../assets/madness.png';
import { User } from '../../services/firebaseService';

export interface EditProfileFormProps {
  name: string;
  email: string;
  photo: FileList;
}

interface Props {
  form: UseFormReturn<EditProfileFormProps, object>;
  onSubmit: (values: EditProfileFormProps) => Promise<void>;
  isLoading: boolean;
  error: string;
  user: User | null;
}

const EditProfileForm = ({ isLoading, error, form, onSubmit, user }: Props) => {
  return (
    <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="rounded-md max-w-sm">
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
          <label htmlFor="name">Email</label>
          <input
            id="email"
            required
            className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
            disabled
            {...form.register('email')}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">Photo</label>

          <img className="h-auto w-48 mr-2 mt-4" src={user?.photoURL || madness} alt="" />

          <input
            id="photoURL"
            accept="image/gif, image/jpeg, image/png"
            type="file"
            className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Fichier"
            {...form.register('photo')}
          />
        </div>

        <div>
          <button
            type="submit"
            className="mb-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <SaveIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sauvegarder
          </button>

          {!isLoading && error && <span className="pt-6 text-rose-700">{error}</span>}
          {isLoading && <span className="pt-6">Ça load, sera pas long...</span>}
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
