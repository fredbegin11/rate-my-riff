import { useState } from 'react';
import { format } from 'date-fns';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import Layout from '../components/Layout';
import List from '../components/List';
import useRiffs from '../hooks/useRiffs';
import ConfirmationModal from '../components/ConfirmationModal';
import Riff from '../models/Riff';
import ratingFull from '../assets/rating_full.svg';
import ratingEmpty from '../assets/rating_empty.svg';

const renderAudioPlayer = (riff: Riff) => <AudioPlayer riff={riff} />;

const renderAverageRating = (riff: Riff) => (
  <div className="flex flex-col">
    <Rating
      readonly
      initialRating={riff.getAverageRating()}
      emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
      fullSymbol={<img width={35} alt="full" src={ratingFull} />}
    />
  </div>
);
const renderMyRating = (riff: Riff, onClick: (id: string, rating: number) => void) => (
  <Rating
    fractions={2}
    initialRating={riff.getMyRating()}
    emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
    fullSymbol={<img width={35} alt="full" src={ratingFull} />}
    onClick={(rating) => onClick(riff.id, rating)}
  />
);

const Riffs = () => {
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  const {
    selectors: { data, isLoading },
    actions: { deleteRiff, addRiffRating },
  } = useRiffs();

  const handleDelete = (id: string) => {
    deleteRiff(id);
    setItemToDelete(undefined);
  };

  const handleCancel = () => setItemToDelete(undefined);

  return (
    <Layout>
      <div className="pt-16 lg:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Les Riffs</span>
          <Link to="/riffs/create" className="mr-6 btn btn-default">
            Ajouter un riff
          </Link>
        </div>
        <List
          data={data}
          isLoading={isLoading}
          keys={[
            {
              name: 'fileName',
              label: 'Audio',
              transformer: renderAudioPlayer,
            },
            { name: 'name', label: 'Nom' },
            {
              name: 'creationDate',
              label: 'Date de Création',
              transformer: (riff: Riff) => (riff.creationDate ? format(riff.creationDate, 'yyyy/MM/dd') : '-'),
            },
            { name: 'author', label: 'Auteur' },
            { name: 'rating', label: 'Note Moyenne', transformer: (riff: Riff) => renderAverageRating(riff) },
            { name: 'rating', label: 'Ma Note', transformer: (riff: Riff) => renderMyRating(riff, addRiffRating) },
          ]}
          actions={[{ label: 'Supprimer', onClick: (id: string) => setItemToDelete(id) }]}
        />
        <ConfirmationModal onCancel={handleCancel} onConfirm={() => itemToDelete && handleDelete(itemToDelete)} visible={!!itemToDelete} />
      </div>
    </Layout>
  );
};

export default Riffs;
