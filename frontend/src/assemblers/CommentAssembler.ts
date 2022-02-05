import { v4 as uuidv4 } from 'uuid';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import Comment from '../models/Comment';
import AuthClient from '../services/AuthClient';

class CommentAssembler {
  fromForm({ message }: CreateCommentFormProps): Comment {
    return {
      id: uuidv4(),
      author: AuthClient.getCurrentUserDisplayName(),
      creationDate: Date.now(),
      message,
    };
  }
}

export default new CommentAssembler();
