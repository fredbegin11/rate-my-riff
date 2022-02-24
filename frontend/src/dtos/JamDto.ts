import RatingDto from './RatingDto';

interface JamDto {
  id: string;
  name: string;
  ratings: RatingDto;
  author: string;
  creationDate: number;
  url: string;
}

export default JamDto;
