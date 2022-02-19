import { UseFormReturn } from 'react-hook-form';
import madness from '../../assets/madness.png';
import { User } from '../../services/firebaseService';
import ErrorMessage from './ErrorMessage';
import SubmitButton from '../SubmitButton';

export interface EditProfileFormProps {
  name: string;
  email: string;
  photo: FileList;
}

interface Props {
  form: UseFormReturn<EditProfileFormProps, object>;
  onSubmit: (values: EditProfileFormProps) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const EditProfileForm = ({ isLoading, isError, form, onSubmit, user }: Props) => {
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
          <SubmitButton label="Sauvegarder" type="Save" isLoading={isLoading} />
          {!isLoading && isError && <ErrorMessage />}
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
