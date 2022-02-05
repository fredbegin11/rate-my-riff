import RatingDto from './RatingDto';

interface LyricsDto {
  id: string;
  name: string;
  ratings: RatingDto;
  author: string;
  creationDate: number;
  lyrics: string;
}

export default LyricsDto;
