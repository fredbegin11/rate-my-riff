import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateLyricsForm, { CreateLyricsFormProps } from '../components/form/CreateLyricsForm';
import useLyrics from '../hooks/useLyrics';

const CreateLyrics = () => {
  const navigate = useNavigate();

  const {
    actions: {
      create: { action: createLyrics, isLoading, isError },
    },
  } = useLyrics();

  const onSubmit = async (values: CreateLyricsFormProps) => {
    await createLyrics(values);
    navigate('/lyrics');
  };

  const form = useForm<CreateLyricsFormProps>();

  return (
    <Layout>
      <div className="p-16">
        <CreateLyricsForm form={form} onSubmit={onSubmit} isLoading={isLoading} isError={isError} />
      </div>
    </Layout>
  );
};

export default CreateLyrics;
