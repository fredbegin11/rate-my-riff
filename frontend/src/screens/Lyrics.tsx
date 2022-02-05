import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import LyricsCard from '../components/LyricsCard';
import ConfirmationModal from '../components/ConfirmationModal';
import Layout from '../components/Layout';
import useLyrics from '../hooks/useLyrics';

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
            <LyricsCard
              action={{ icon: <TrashIcon width={25} height={25} className="text-rose-700" />, onClick: () => setItemToDelete(item.id) }}
              key={item.id}
              lyrics={item}
              addRating={addLyricsRating}
            />
          ))}
        </div>
        <ConfirmationModal onCancel={handleCancel} onConfirm={() => itemToDelete && handleDelete(itemToDelete)} visible={!!itemToDelete} />
      </div>
    </Layout>
  );
};

export default Lyrics;
