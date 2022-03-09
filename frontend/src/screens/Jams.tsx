import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import JamList from '../components/JamList';
import useJams from '../hooks/useJams';

const Jams = () => {
  const {
    selectors: { data, isLoading },
    actions: {
      update: { action: updateJam },
      delete: { action: deleteJam },
      addRating: { action: addRating },
      removeComment: { action: removeComment },
      addComment: { action: addComment },
    },
  } = useJams();

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Jams</span>
          <Link to="/jams/create" className="mr-6 btn btn-default">
            Ajouter un jam
          </Link>
        </div>
        <JamList
          updateJam={updateJam}
          removeComment={removeComment}
          addComment={addComment}
          data={data}
          isLoading={isLoading}
          deleteJam={deleteJam}
          addJamRating={addRating}
        />
      </div>
    </Layout>
  );
};

export default Jams;
