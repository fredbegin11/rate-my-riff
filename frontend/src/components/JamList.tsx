import { AnnotationIcon, TrashIcon } from '@heroicons/react/outline';
import { useMemo, useState } from 'react';
import { Cell } from 'react-table';
import Rating from 'react-rating';
import { UseMutateFunction } from 'react-query';
import List from './List';
import ConfirmationModal from './ConfirmationModal';
import Jam from '../models/Jam';
import ratingFull from '../assets/rating_full.svg';
import ratingEmpty from '../assets/rating_empty.svg';
import DateService from '../services/DateService';
import CommentsModal from './CommentsModal';
import { AddCommentProps, AddRatingProps, RemoveCommentProps, UpdateProps } from '../hooks/useJams';

const renderMyRating = (jam: Jam, onClick: (props: AddRatingProps) => void) => (
  <Rating
    initialRating={jam.myRating}
    emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
    fullSymbol={<img width={35} alt="full" src={ratingFull} />}
    onClick={(rating) => onClick({ id: jam.id, rating })}
    className="w-36"
  />
);

interface Props {
  addJamRating: UseMutateFunction<void, unknown, AddRatingProps, unknown>;
  addComment: UseMutateFunction<void, unknown, AddCommentProps, unknown>;
  removeComment: UseMutateFunction<void, unknown, RemoveCommentProps, unknown>;
  data: Jam[];
  isLoading: boolean;
  deleteJam: (id: string) => void;
  updateJam: UseMutateFunction<void, unknown, UpdateProps, unknown>;
}

const JamList = ({ deleteJam, addJamRating, updateJam, data, isLoading, addComment, removeComment }: Props) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [itemToComment, setItemToComment] = useState<string | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    deleteJam(id);
    setItemToDelete(undefined);
  };

  const handleCancel = () => {
    setItemToDelete(undefined);
    setIsCommentModalVisible(false);
  };

  const columns = useMemo(
    () => [
      {
        accessor: 'hasBeenUsed',
        Header: 'Utilisé',
        Cell: ({ row, value }: Cell) => {
          const jam = row.original as Jam;

          return (
            <input type="checkbox" checked={value} onChange={(e) => updateJam({ id: jam.id, dataToUpdate: { hasBeenUsed: e.target.checked } })} />
          );
        },
      },
      {
        accessor: 'name',
        Header: 'Nom',
        Cell: ({ row, value }: Cell) => {
          const jam = row.original as Jam;

          return (
            <div className="text-sm text-gray-900 max-w-sm text-ellipsis overflow-hidden" title={value}>
              <a target="_blank" rel="noopener noreferrer" href={jam.url} className="underline font-bold">
                {value}
              </a>
            </div>
          );
        },
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
        Cell: ({ row }: Cell) => renderMyRating(row.original as Jam, addJamRating),
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

export default JamList;
