import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import useRiffs from '../hooks/useRiffs';
import RiffList from '../components/RiffList';

const Fullband = () => {
  const {
    selectors: { data, isLoading },
    actions: {
      update: { action: updateRiff },
      delete: { action: deleteRiff },
      addRating: { action: addRating },
      removeComment: { action: removeComment },
      addComment: { action: addComment },
    },
  } = useRiffs('fullband');

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Full Band</span>
          <Link to="/riffs/create" className="mr-6 btn btn-default">
            Ajouter une track
          </Link>
        </div>
        <RiffList
          updateRiff={updateRiff}
          removeComment={removeComment}
          addComment={addComment}
          data={data}
          isLoading={isLoading}
          deleteRiff={deleteRiff}
          addRiffRating={addRating}
        />
      </div>
    </Layout>
  );
};

export default Fullband;
