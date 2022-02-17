import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import useRiffs from '../hooks/useRiffs';
import RiffList from '../components/RiffList';

const Setlist = () => {
  const {
    selectors: { data, isLoading },
    actions: { deleteRiff, addRiffRating, removeComment, addComment },
  } = useRiffs('fullband');

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Setlist</span>
          <Link to="/riffs/create" className="mr-6 btn btn-default">
            Ajouter une track
          </Link>
        </div>
        <RiffList
          removeComment={removeComment}
          addComment={addComment}
          data={data}
          isLoading={isLoading}
          deleteRiff={deleteRiff}
          addRiffRating={addRiffRating}
        />
      </div>
    </Layout>
  );
};

export default Setlist;
