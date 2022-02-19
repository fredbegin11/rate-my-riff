import { useState } from 'react';
import { AnnotationIcon, TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import LyricsCard from '../components/LyricsCard';
import ConfirmationModal from '../components/ConfirmationModal';
import Layout from '../components/Layout';
import useLyrics from '../hooks/useLyrics';
import CommentsModal from '../components/CommentsModal';

const Lyrics = () => {
  const {
    selectors: { data },
    actions: {
      delete: { action: deleteLyrics },
      addRating: { action: addRating },
      addComment: { action: addComment },
      removeComment: { action: removeComment },
    },
  } = useLyrics();

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [itemToComment, setItemToComment] = useState<string | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    deleteLyrics(id);
    setItemToDelete(undefined);
  };

  const handleCancel = () => {
    setItemToDelete(undefined);
    setIsCommentModalVisible(false);
  };

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
              actions={[
                {
                  render: (showBadge: boolean) => (
                    <div className="relative flex justify-center items-center w-6 h-6 rounded-full">
                      <AnnotationIcon width={25} height={25} className="text-gray-800" />
                      {showBadge && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full" />}
                    </div>
                  ),
                  onClick: (id: string) => {
                    setItemToComment(id);
                    setIsCommentModalVisible(true);
                  },
                },
                { icon: <TrashIcon width={25} height={25} className="ml-2 text-rose-700" />, onClick: () => setItemToDelete(item.id) },
              ]}
              key={item.id}
              lyrics={item}
              addRating={addRating}
            />
          ))}
        </div>
        <ConfirmationModal onCancel={handleCancel} onConfirm={() => itemToDelete && handleDelete(itemToDelete)} visible={!!itemToDelete} />
        <CommentsModal
          addComment={addComment}
          removeComment={removeComment}
          onCancel={handleCancel}
          onConfirm={() => {}}
          visible={isCommentModalVisible}
          item={data.find((item) => item.id === itemToComment)!}
        />
      </div>
    </Layout>
  );
};

export default Lyrics;
