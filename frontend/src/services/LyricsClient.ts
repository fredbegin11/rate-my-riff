import CommentAssembler from '../assemblers/CommentAssembler';
import LyricsAssembler from '../assemblers/LyricsAssembler';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateLyricsFormProps } from '../components/form/CreateLyricsForm';
import LyricsDto from '../dtos/LyricsDto';
import AuthClient from './AuthClient';
import PersistenceClient from './PersistenceClient';

class LyricsClient {
  getAll = async () => {
    const lyricsObject: LyricsDto[] = await PersistenceClient.getData('lyrics');
    return Object.values(lyricsObject).map(LyricsAssembler.fromDto);
  };

  create = async (form: CreateLyricsFormProps) => {
    const lyrics = LyricsAssembler.fromForm(form);
    await PersistenceClient.writeData(`lyrics/${lyrics.id}`, LyricsAssembler.toObject(lyrics));
  };

  delete = (id: string) => PersistenceClient.deleteData(`lyrics/${id}`);

  addRating = (id: string, rating: number) => {
    return PersistenceClient.updateData(`lyrics/${id}/ratings`, { [AuthClient.getCurrentUserDisplayName()]: rating });
  };

  addComment = (riffId: string, form: CreateCommentFormProps) => {
    const comment = CommentAssembler.fromForm(form);
    return PersistenceClient.updateData(`riffs/${riffId}/comments`, { [comment.id]: comment });
  };

  removeComment = (riffId: string, commentId: string) => {
    return PersistenceClient.updateData(`riffs/${riffId}/comments/${commentId}`, undefined);
  };
}

export default new LyricsClient();
