import { AnnotationIcon, TrashIcon } from '@heroicons/react/outline';
import { useMemo, useState } from 'react';
import { Cell } from 'react-table';
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
    initialRating={riff.myRating}
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

  const columns = useMemo(
    () => [
      {
        accessor: 'fileName',
        Header: 'Audio',
        Cell: ({ row }: Cell) => <AudioPlayer riff={row.original as Riff} />,
      },
      {
        accessor: 'name',
        Header: 'Nom',
        Cell: ({ value }: Cell) => (
          <div className="text-sm text-gray-900 max-w-sm text-ellipsis overflow-hidden" title={value}>
            {value}
          </div>
        ),
      },
      {
        accessor: 'creationDate',
        Header: 'Date de Création',
        Cell: ({ value }: Cell) => DateService.format(value),
      },
      { accessor: 'author', Header: 'Auteur' },
      {
        accessor: 'averageRating',
        Header: 'Note Moyenne',
        Cell: ({ value }: Cell) => (
          <div className="flex flex-col">
            <Rating
              readonly
              initialRating={value}
              emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
              fullSymbol={<img width={35} alt="full" src={ratingFull} />}
              className="w-36"
            />
          </div>
        ),
      },
      {
        accessor: 'myRating',
        Header: 'Ma Note',
        Cell: ({ row }: Cell) => renderMyRating(row.original as Riff, addRiffRating),
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <>
      <List data={data} isLoading={isLoading} columns={columns} actions={actions} />
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
