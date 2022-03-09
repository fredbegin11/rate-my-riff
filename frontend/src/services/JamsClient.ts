import CommentAssembler from '../assemblers/CommentAssembler';
import JamAssembler from '../assemblers/JamAssembler';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateJamFormProps } from '../components/form/CreateJamForm';
import JamDto from '../dtos/JamDto';
import Jam from '../models/Jam';
import AuthClient from './AuthClient';
import PersistenceClient from './PersistenceClient';

class JamsClient {
  getAll = async () => {
    const jamsObject: JamDto[] = await PersistenceClient.getData('jams');
    const jams: Jam[] = jamsObject ? Object.values(jamsObject).map(JamAssembler.fromDto) : [];

    return jams;
  };

  create = async (form: CreateJamFormProps) => {
    const jam = JamAssembler.fromForm(form);
    await PersistenceClient.writeData(`jams/${jam.id}`, JamAssembler.toObject(jam));
  };

  delete = (id: string) => PersistenceClient.deleteData(`jams/${id}`);

  addRating = (id: string, rating: number) => {
    return PersistenceClient.updateData(`jams/${id}/ratings`, { [AuthClient.getCurrentUserDisplayName()]: rating });
  };

  addComment = (jamId: string, form: CreateCommentFormProps) => {
    const comment = CommentAssembler.fromForm(form);

    return PersistenceClient.updateData(`jams/${jamId}/comments`, { [comment.id]: comment });
  };

  removeComment = (jamId: string, commentId: string) => {
    return PersistenceClient.deleteData(`jams/${jamId}/comments/${commentId}`);
  };

  update = (jamId: string, data: Partial<Jam>) => {
    return PersistenceClient.updateData(`jams/${jamId}`, data);
  };
}

export default new JamsClient();
