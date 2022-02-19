import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import EditProfileForm, { EditProfileFormProps } from '../components/form/EditProfileForm';

const Profile = () => {
  const form = useForm<EditProfileFormProps>();

  const {
    actions: {
      editProfile: { action: editProfile, isLoading, isError },
    },
    selectors: { user },
  } = useAuth();

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.displayName || undefined,
        email: user?.email || undefined,
      });
    }
  }, [user]);

  const onSubmit = async (values: EditProfileFormProps) => editProfile(values);

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="ml-6 flex flex-col">
          <span className="text-2xl font-bold">Mon Profile</span>
          <EditProfileForm form={form} isError={isError} isLoading={isLoading} onSubmit={onSubmit} user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
