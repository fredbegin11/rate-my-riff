import RiffAssembler from '../assemblers/RiffAssembler';
import { CreateRiffFormProps } from '../components/riffs/CreateRiffForm';
import RiffDto from '../dtos/RiffDto';
import Riff from '../models/Riff';
import AuthClient from './AuthClient';
import PersistenceClient from './PersistenceClient';

class RiffClient {
  getRiffs = async () => {
    const riffsObject: RiffDto[] = await PersistenceClient.getData('riffs');
    const riffs: Riff[] = Object.values(riffsObject).map(RiffAssembler.fromDto);

    return riffs;
  };

  createRiff = async (form: CreateRiffFormProps) => {
    const riff = RiffAssembler.fromForm(form);
    await PersistenceClient.writeData(`riffs/${riff.id}`, RiffAssembler.toObject(riff));
  };

  deleteRiff = (id: string) => PersistenceClient.deleteData(`riffs/${id}`);

  addRating = (id: string, rating: number) => {
    return PersistenceClient.updateData(`riffs/${id}/ratings`, { [AuthClient.getCurrentUserDisplayName()]: rating });
  };
}

export default new RiffClient();
