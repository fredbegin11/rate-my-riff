import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import useRiffs from '../hooks/useRiffs';
import RiffList from '../components/RiffList';

const Drums = () => {
  const {
    selectors: { data, isLoading },
    actions: { deleteRiff, addRiffRating },
  } = useRiffs('drums');

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Drums</span>
          <Link to="/riffs/create" className="mr-6 btn btn-default">
            Ajouter un riff
          </Link>
        </div>
        <RiffList data={data} isLoading={isLoading} deleteRiff={deleteRiff} addRiffRating={addRiffRating} />
      </div>
    </Layout>
  );
};

export default Drums;
