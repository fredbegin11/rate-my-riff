import Instrument from '../models/Instrument';
import RatingDto from './RatingDto';

interface RiffDto {
  id: string;
  name: string;
  ratings: RatingDto;
  author: string;
  creationDate: number;
  fileName: string;
  instrument: Instrument;
  hasBeenUsed?: boolean;
}

export default RiffDto;
