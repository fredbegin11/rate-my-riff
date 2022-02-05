import CommentAssembler from '../assemblers/CommentAssembler';
import RiffAssembler from '../assemblers/RiffAssembler';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import RiffDto from '../dtos/RiffDto';
import Riff from '../models/Riff';
import AuthClient from './AuthClient';
import PersistenceClient from './PersistenceClient';

class RiffsClient {
  getAll = async () => {
    const riffsObject: RiffDto[] = await PersistenceClient.getData('riffs');
    const riffs: Riff[] = Object.values(riffsObject).map(RiffAssembler.fromDto);

    return riffs;
  };

  create = async (form: CreateRiffFormProps) => {
    const riff = RiffAssembler.fromForm(form);
    await PersistenceClient.writeData(`riffs/${riff.id}`, RiffAssembler.toObject(riff));
  };

  delete = (id: string) => PersistenceClient.deleteData(`riffs/${id}`);

  addRating = (id: string, rating: number) => {
    return PersistenceClient.updateData(`riffs/${id}/ratings`, { [AuthClient.getCurrentUserDisplayName()]: rating });
  };

  addComment = (riffId: string, form: CreateCommentFormProps) => {
    const comment = CommentAssembler.fromForm(form);

    return PersistenceClient.updateData(`riffs/${riffId}/comments`, { [comment.id]: comment });
  };

  removeComment = (riffId: string, commentId: string) => {
    return PersistenceClient.deleteData(`riffs/${riffId}/comments/${commentId}`);
  };
}

export default new RiffsClient();
