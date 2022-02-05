import AuthClient from '../services/AuthClient';
import Rating from './Ratings';

export interface LyricsProps {
  id: string;
  name: string;
  ratings: Rating;
  author: string;
  creationDate: number;
  lyrics: string;
}

class Lyrics {
  id: string;
  name: string;
  ratings: Rating;
  author: string;
  creationDate: number;
  lyrics: string;

  constructor(props: LyricsProps) {
    this.id = props.id;
    this.name = props.name;
    this.ratings = props.ratings || [];
    this.author = props.author;
    this.creationDate = props.creationDate;
    this.lyrics = props.lyrics;
  }

  getAverageRating() {
    const rawRatings = Object.values(this.ratings).map((rating) => rating);
    const sum = rawRatings.reduce((a, b) => a + b, 0);

    return sum / rawRatings.length || 0;
  }

  getMyRating() {
    const displayName = AuthClient.getCurrentUserDisplayName();

    return this.ratings[displayName] || 0;
  }
}

export default Lyrics;
