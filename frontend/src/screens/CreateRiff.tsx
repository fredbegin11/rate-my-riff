import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateRiffForm, { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import useFileUpload from '../hooks/useFileUpload';
import useRiffs from '../hooks/useRiffs';

const CreateRiff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    actions: { createRiff },
  } = useRiffs();

  const {
    actions: { uploadFile },
  } = useFileUpload();

  const onSubmit = async (values: CreateRiffFormProps) => {
    setIsLoading(true);
    try {
      await uploadFile(values.file[0].name, values.file[0]);
      await createRiff(values);
      navigate('/riffs');
    } catch (err) {
      setError('Ça marche pas');
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<CreateRiffFormProps>();

  return (
    <Layout>
      <div className="p-16">
        <CreateRiffForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
      </div>
    </Layout>
  );
};

export default CreateRiff;
