import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateRiffForm, { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import useFileUpload from '../hooks/useFileUpload';
import useRiffs from '../hooks/useRiffs';

const CreateRiff = () => {
  const navigate = useNavigate();

  const {
    actions: { createRiff },
    selectors: { isCreateRiffError, isCreateRiffLoading },
  } = useRiffs();

  const {
    actions: { uploadFile },
  } = useFileUpload();

  const onSubmit = async (values: CreateRiffFormProps) => {
    await uploadFile(values.file[0].name, values.file[0]);
    await createRiff(values);
    navigate('/riffs');
  };

  const form = useForm<CreateRiffFormProps>();

  return (
    <Layout>
      <div className="p-16">
        <CreateRiffForm form={form} onSubmit={onSubmit} isLoading={isCreateRiffLoading} isError={isCreateRiffError} />
      </div>
    </Layout>
  );
};

export default CreateRiff;
