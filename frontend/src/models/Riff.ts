import AuthClient from '../services/AuthClient';
import StorageClient from '../services/StorageClient';
import Comment from './Comment';
import Instrument from './Instrument';
import Rating from './Ratings';

export interface RiffProps {
  id: string;
  name: string;
  ratings: Rating;
  author: string;
  creationDate: number;
  fileName: string;
  instrument: Instrument;
  comments?: Comment[];
}

class Riff {
  id: string;
  name: string;
  ratings: Rating;
  author: string;
  creationDate: number;
  fileName: string;
  instrument: Instrument;
  url?: string;
  comments: Comment[];

  constructor(props: RiffProps) {
    this.id = props.id;
    this.name = props.name;
    this.ratings = props.ratings || [];
    this.author = props.author;
    this.creationDate = props.creationDate;
    this.fileName = props.fileName;
    this.instrument = props.instrument;
    this.comments = props.comments ? Object.values(props.comments) : [];
  }

  async getUrl() {
    return this.fileName ? StorageClient.getFileUrl(this.fileName) : '';
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

  getOrderedComments() {
    return this.comments.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));
  }
}

export default Riff;
