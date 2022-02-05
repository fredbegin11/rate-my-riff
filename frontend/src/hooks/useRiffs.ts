import { useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import Instrument from '../models/Instrument';
import Riff from '../models/Riff';
import RiffsClient from '../services/RiffsClient';

interface RiffsHook {
  actions: {
    deleteRiff: (id: string) => Promise<void>;
    createRiff: (form: CreateRiffFormProps) => Promise<void>;
    addRiffRating: (id: string, rating: number) => Promise<void>;
    addComment: (riffId: string, form: CreateCommentFormProps) => Promise<void>;
    removeComment: (riffId: string, commentId: string) => Promise<void>;
  };
  selectors: {
    data: Riff[];
    isError: boolean;
    isLoading: boolean;
  };
}

const useRiffs = (instrument: Instrument = 'strings'): RiffsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('riffs', () => RiffsClient.getAll());

  const deleteRiff = async (id: string) => {
    await RiffsClient.delete(id);
    queryClient.invalidateQueries('riffs');
  };

  const createRiff = async (form: CreateRiffFormProps) => {
    await RiffsClient.create(form);
    queryClient.invalidateQueries('riffs');
  };

  const addRiffRating = async (id: string, rating: number) => {
    await RiffsClient.addRating(id, rating);
    queryClient.invalidateQueries('riffs');
  };

  const addComment = async (riffId: string, form: CreateCommentFormProps) => {
    await RiffsClient.addComment(riffId, form);
    queryClient.invalidateQueries('riffs');
  };

  const removeComment = async (riffId: string, commentId: string) => {
    await RiffsClient.removeComment(riffId, commentId);
    queryClient.invalidateQueries('riffs');
  };

  return {
    actions: { deleteRiff, createRiff, addRiffRating, addComment, removeComment },
    selectors: { data: data.filter((riff) => riff.instrument === instrument), isError, isLoading },
  };
};

export default useRiffs;
