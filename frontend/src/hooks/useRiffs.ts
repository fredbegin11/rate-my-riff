import { useQuery } from 'react-query';
import RiffsClient from '../services/RiffsClient';

const useRiffs = () => {
  const riffs = useQuery('riffs', () => RiffsClient.getRiffs());

  return { riffs };
};

export default useRiffs;
