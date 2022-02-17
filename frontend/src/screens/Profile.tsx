import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import useFileUpload from '../hooks/useFileUpload';
import useProfile from '../hooks/useProfile';
import EditProfileForm, { EditProfileFormProps } from '../components/form/EditProfileForm';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<EditProfileFormProps>();

  const {
    actions: { uploadFile },
  } = useFileUpload();

  const {
    actions: { editProfile },
    selectors: { user },
  } = useProfile();

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.displayName || undefined,
        email: user?.email || undefined,
      });
    }
  }, [user]);

  const onSubmit = async (values: EditProfileFormProps) => {
    setIsLoading(true);
    try {
      if (values.photo.length > 0) {
        await uploadFile(values.photo[0].name, values.photo[0]);
      }
      await editProfile(values);
    } catch (err) {
      setError('Ça marche pas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="ml-6 flex flex-col">
          <span className="text-2xl font-bold">Mon Profile</span>
          <EditProfileForm form={form} error={error} isLoading={isLoading} onSubmit={onSubmit} user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
