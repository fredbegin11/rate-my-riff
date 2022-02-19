import { UseFormReturn } from 'react-hook-form';
import { User } from '../../services/firebaseService';
import ErrorMessage from './ErrorMessage';
import SubmitButton from '../SubmitButton';
import ProfilePhotoService from '../../services/ProfilePhotoService';

export interface EditProfileFormProps {
  name: string;
  email: string;
}

interface Props {
  form: UseFormReturn<EditProfileFormProps, object>;
  onSubmit: (values: EditProfileFormProps) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

const EditProfileForm = ({ isLoading, isError, form, onSubmit, user }: Props) => {
  const photoUrl = ProfilePhotoService.getProfilePhoto({ name: user?.displayName });

  return (
    <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="rounded-md max-w-sm">
        <div className="mb-4">
          <label className="font-bold" htmlFor="name">
            Photo
          </label>
          {photoUrl && <img className="object-cover w-full mr-2 my-4" src={photoUrl} alt="" />}
        </div>

        <div className="mb-4">
          <label className="font-bold" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            required
            className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Nom"
            {...form.register('name')}
          />
        </div>
        <div className="mb-8">
          <label className="font-bold" htmlFor="name">
            Email
          </label>
          <input
            id="email"
            required
            className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
            disabled
            {...form.register('email')}
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
