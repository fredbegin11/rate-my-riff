import Layout from '../components/Layout';
import useRiffs from '../hooks/useRiffs';

const Riffs = () => {
  const props = useRiffs();

  console.log('Riffs: ', props);

  return (
    <Layout>
      <span>Riffs</span>
    </Layout>
  );
};

export default Riffs;
