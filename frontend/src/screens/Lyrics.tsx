import Rating from 'react-rating';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ConfirmationModal from '../components/ConfirmationModal';
import Layout from '../components/Layout';
import useLyrics from '../hooks/useLyrics';
import ratingFull from '../assets/rating_full.svg';
import ratingEmpty from '../assets/rating_empty.svg';

const Lyrics = () => {
  const {
    selectors: { data },
    actions: { deleteLyrics, addLyricsRating },
  } = useLyrics();

  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    deleteLyrics(id);
    setItemToDelete(undefined);
  };

  const handleCancel = () => setItemToDelete(undefined);

  return (
    <Layout>
      <div className="pt-16 xl:p-16">
        <div className="mb-8 flex justify-between">
          <span className="ml-6 text-2xl font-bold">Lyrics</span>
          <Link to="/lyrics/create" className="mr-6 btn btn-default">
            Ajouter des lyrics
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <Card
              action={{ icon: <TrashIcon width={30} height={30} className="text-rose-700" />, onClick: () => setItemToDelete(item.id) }}
              key={item.id}
              title={item.name}
              content={item.lyrics}
              author={item.author}
              footer={
                <div className="mt-12">
                  <h2 className="mt-4 mb-1 text-gray-800 font-semibold">Note Moyenne</h2>
                  <Rating
                    readonly
                    initialRating={item.getAverageRating()}
                    emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
                    fullSymbol={<img width={35} alt="full" src={ratingFull} />}
                    className="w-48"
                  />
                  <h2 className="mt-4 mb-1 text-gray-800 font-semibold">Ma Note</h2>
                  <Rating
                    initialRating={item.getMyRating()}
                    emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
                    fullSymbol={<img width={35} alt="full" src={ratingFull} />}
                    onClick={(rating) => addLyricsRating(item.id, rating)}
                    className="w-48"
                  />
                </div>
              }
            />
          ))}
        </div>
        <ConfirmationModal onCancel={handleCancel} onConfirm={() => itemToDelete && handleDelete(itemToDelete)} visible={!!itemToDelete} />
      </div>
    </Layout>
  );
};

export default Lyrics;
