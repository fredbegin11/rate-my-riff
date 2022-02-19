import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import useRiffs from '../hooks/useRiffs';
import RiffList from '../components/RiffList';

const Drums = () => {
  const {
    selectors: { data, isLoading },
    actions: {
      delete: { action: deleteRiff },
      addRating: { action: addRating },
      removeComment: { action: removeComment },
      addComment: { action: addComment },
    },
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
        <RiffList
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

export default Drums;
