import RatingDto from './RatingDto';

interface RiffDto {
  id: string;
  name: string;
  ratings: RatingDto;
  author: string;
  creationDate: number;
  fileName: string;
}

export default RiffDto;
