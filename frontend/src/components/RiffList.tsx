import { AnnotationIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import Rating from 'react-rating';
import AudioPlayer from './AudioPlayer';
import List from './List';
import ConfirmationModal from './ConfirmationModal';
import Riff from '../models/Riff';
import ratingFull from '../assets/rating_full.svg';
import ratingEmpty from '../assets/rating_empty.svg';
import DateService from '../services/DateService';
import CommentsModal from './CommentsModal';
import { CreateCommentFormProps } from './form/CreateCommentForm';

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
  addComment: (riffId: string, form: CreateCommentFormProps) => Promise<void>;
  removeComment: (riffId: string, commentId: string) => Promise<void>;
  data: Riff[];
  isLoading: boolean;
  deleteRiff: (id: string) => void;
}

const RiffList = ({ deleteRiff, addRiffRating, data, isLoading, addComment, removeComment }: Props) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [itemToComment, setItemToComment] = useState<string | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    deleteRiff(id);
    setItemToDelete(undefined);
  };

  const handleCancel = () => {
    setItemToDelete(undefined);
    setIsCommentModalVisible(false);
  };

  return (
    <>
      <List
        data={data}
        isLoading={isLoading}
        keys={[
          {
            name: 'fileName',
            label: 'Audio',
            transformer: (riff: Riff) => <AudioPlayer riff={riff} />,
          },
          {
            name: 'name',
            label: 'Nom',
            transformer: (riff: Riff) => (
              <div className="text-sm text-gray-900 max-w-sm text-ellipsis overflow-hidden" title={riff.name}>
                {riff.name}
              </div>
            ),
          },
          {
            name: 'creationDate',
            label: 'Date de Création',
            transformer: (riff: Riff) => DateService.format(riff.creationDate),
          },
          { name: 'author', label: 'Auteur' },
          {
            name: 'averageRating',
            label: 'Note Moyenne',
            transformer: (riff: Riff) => (
              <div className="flex flex-col">
                <Rating
                  readonly
                  initialRating={riff.getAverageRating()}
                  emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
                  fullSymbol={<img width={35} alt="full" src={ratingFull} />}
                  className="w-36"
                />
              </div>
            ),
          },
          { name: 'myRating', label: 'Ma Note', transformer: (riff: Riff) => renderMyRating(riff, addRiffRating) },
        ]}
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
          { icon: <TrashIcon width={25} height={25} className="text-rose-700" />, onClick: (id: string) => setItemToDelete(id) },
        ]}
      />
      <ConfirmationModal onCancel={handleCancel} onConfirm={() => itemToDelete && handleDelete(itemToDelete)} visible={!!itemToDelete} />
      <CommentsModal
        addComment={addComment}
        removeComment={removeComment}
        onCancel={handleCancel}
        onConfirm={() => {}}
        visible={isCommentModalVisible}
        item={data.find((item) => item.id === itemToComment)!}
      />
    </>
  );
};

export default RiffList;
