import { useState } from 'react';
import { format } from 'date-fns';
import Rating from 'react-rating';
import AudioPlayer from './AudioPlayer';
import List from './List';
import ConfirmationModal from './ConfirmationModal';
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
      className="w-36"
    />
  </div>
);

const renderMyRating = (riff: Riff, onClick: (id: string, rating: number) => void) => (
  <Rating
    initialRating={riff.getMyRating()}
    emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
    fullSymbol={<img width={35} alt="full" src={ratingFull} />}
    onClick={(rating) => onClick(riff.id, rating)}
    className="w-36"
  />
);

interface Props {
  addRiffRating: (id: string, rating: number) => void;
  data: Riff[];
  isLoading: boolean;
  deleteRiff: (id: string) => void;
}

const RiffList = ({ deleteRiff, addRiffRating, data, isLoading }: Props) => {
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    deleteRiff(id);
    setItemToDelete(undefined);
  };

  const handleCancel = () => setItemToDelete(undefined);

  return (
    <>
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
          { name: 'averageRating', label: 'Note Moyenne', transformer: (riff: Riff) => renderAverageRating(riff) },
          { name: 'myRating', label: 'Ma Note', transformer: (riff: Riff) => renderMyRating(riff, addRiffRating) },
        ]}
        actions={[{ label: 'Supprimer', onClick: (id: string) => setItemToDelete(id) }]}
      />
      <ConfirmationModal onCancel={handleCancel} onConfirm={() => itemToDelete && handleDelete(itemToDelete)} visible={!!itemToDelete} />
    </>
  );
};

export default RiffList;
