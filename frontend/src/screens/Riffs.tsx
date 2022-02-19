import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import useRiffs from '../hooks/useRiffs';
import RiffList from '../components/RiffList';

const Riffs = () => {
  const {
    selectors: { data, isLoading },
    actions: {
      delete: { action: deleteRiff },
      addRating: { action: addRating },
      removeComment: { action: removeComment },
      addComment: { action: addComment },
    },
  } = useRiffs();

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Riffs</span>
          <Link to="/riffs/create" className="mr-6 btn btn-default">
            Ajouter un riff
          </Link>
        </div>
        <RiffList
          addComment={addComment}
          removeComment={removeComment}
          data={data}
          isLoading={isLoading}
          deleteRiff={deleteRiff}
          addRiffRating={addRating}
        />
      </div>
    </Layout>
  );
};

export default Riffs;
