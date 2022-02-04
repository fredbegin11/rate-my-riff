import RiffAssembler from '../assemblers/RiffAssembler';
import { CreateRiffFormProps } from '../components/riffs/CreateRiffForm';
import RiffDto from '../dtos/RiffDto';
import Riff from '../models/Riff';
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

  deleteRiff = async (id: string) => {
    await PersistenceClient.deleteData(`riffs/${id}`);
  };
}

export default new RiffClient();
