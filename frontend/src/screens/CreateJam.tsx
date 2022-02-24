import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateJamForm, { CreateJamFormProps } from '../components/form/CreateJamForm';
import useJams from '../hooks/useJams';

const CreateJam = () => {
  const navigate = useNavigate();

  const {
    actions: {
      create: { action: createJam, isError, isLoading },
    },
  } = useJams();

  const onSubmit = async (values: CreateJamFormProps) => {
    await createJam(values);
    navigate('/jams');
  };

  const form = useForm<CreateJamFormProps>();

  return (
    <Layout>
      <div className="p-16">
        <CreateJamForm form={form} onSubmit={onSubmit} isLoading={isLoading} isError={isError} />
      </div>
    </Layout>
  );
};

export default CreateJam;
