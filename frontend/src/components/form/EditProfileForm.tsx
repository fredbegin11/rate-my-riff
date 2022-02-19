import { UseFormReturn } from 'react-hook-form';
import { User } from '../../services/firebaseService';
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

const EditProfileForm = ({ form, onSubmit, user }: Props) => {
  const photoUrl = ProfilePhotoService.getProfilePhoto({ name: user?.displayName });

  return (
    <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="rounded-md max-w-sm">
        <div className="mb-4">{photoUrl && <img className="object-cover w-full mr-2 my-4" src={photoUrl} alt="" />}</div>

        <div className="mb-4 w-full">
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            required
            disabled
            className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Nom"
            {...form.register('name')}
          />
        </div>
        <div className="mb-4 w-full">
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
      </div>
    </form>
  );
};

export default EditProfileForm;
