import { useQuery, useQueryClient } from 'react-query';
import { CreateRiffFormProps } from '../components/riffs/CreateRiffForm';
import Riff from '../models/Riff';
import RiffsClient from '../services/RiffsClient';

interface RiffsHook {
  actions: {
    deleteRiff: (id: string) => void;
    createRiff: (form: CreateRiffFormProps) => void;
  };
  selectors: {
    data: Riff[];
    isError: boolean;
    isLoading: boolean;
  };
}

const useRiffs = (): RiffsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('riffs', () => RiffsClient.getRiffs());

  const deleteRiff = async (id: string) => {
    await RiffsClient.deleteRiff(id);
    queryClient.invalidateQueries('riffs');
  };

  const createRiff = async (form: CreateRiffFormProps) => {
    await RiffsClient.createRiff(form);
    queryClient.invalidateQueries('riffs');
  };

  return {
    actions: { deleteRiff, createRiff },
    selectors: { data, isError, isLoading },
  };
};

export default useRiffs;
