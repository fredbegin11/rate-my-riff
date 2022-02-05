import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateLyricsForm, { CreateLyricsFormProps } from '../components/riffs/CreateLyricsForm';
import useLyrics from '../hooks/useLyrics';

const CreateLyrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    actions: { createLyrics },
  } = useLyrics();

  const onSubmit = async (values: CreateLyricsFormProps) => {
    setIsLoading(true);
    try {
      await createLyrics(values);
      navigate('/lyrics');
    } catch (err) {
      setError('Ça marche pas');
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<CreateLyricsFormProps>();

  return (
    <Layout>
      <div className="p-16">
        <CreateLyricsForm form={form} onSubmit={onSubmit} isLoading={isLoading} error={error} />
      </div>
    </Layout>
  );
};

export default CreateLyrics;
