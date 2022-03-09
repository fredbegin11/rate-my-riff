import AuthClient from '../services/AuthClient';
import Comment from './Comment';
import Rating from './Ratings';

export interface JamProps {
  id: string;
  name: string;
  ratings: Rating;
  author: string;
  creationDate: number;
  url: string;
  comments?: Comment[];
  hasBeenUsed?: boolean;
}

class Jam {
  id: string;
  name: string;
  ratings: Rating;
  author: string;
  creationDate: number;
  url: string;
  comments: Comment[];
  averageRating: number;
  myRating: number;
  hasBeenUsed?: boolean;

  constructor(props: JamProps) {
    this.id = props.id;
    this.name = props.name;
    this.ratings = props.ratings || [];
    this.author = props.author;
    this.creationDate = props.creationDate;
    this.url = props.url;
    this.comments = props.comments ? Object.values(props.comments) : [];

    const rawRatings = Object.values(this.ratings).map((rating) => rating);
    const sum = rawRatings.reduce((a, b) => a + b, 0);
    const displayName = AuthClient.getCurrentUserDisplayName();

    this.averageRating = sum / rawRatings.length || 0;
    this.myRating = this.ratings[displayName] || 0;
    this.hasBeenUsed = props.hasBeenUsed;
  }

  getOrderedComments() {
    return this.comments.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));
  }
}

export default Jam;
