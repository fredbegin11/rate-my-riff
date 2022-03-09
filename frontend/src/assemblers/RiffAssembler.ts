import { v4 as uuidv4 } from 'uuid';
import { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import RiffDto from '../dtos/RiffDto';
import Riff from '../models/Riff';
import AuthClient from '../services/AuthClient';

class RiffAssembler {
  fromForm({ file, name, instrument }: CreateRiffFormProps) {
    const fileName = file[0].name;

    return new Riff({
      id: uuidv4(),
      name,
      ratings: {},
      author: AuthClient.getCurrentUserDisplayName(),
      creationDate: Date.now(),
      fileName,
      instrument,
      hasBeenUsed: false,
    });
  }

  fromDto(dto: RiffDto) {
    return new Riff(dto);
  }

  toObject(riff: Riff) {
    return {
      id: riff.id,
      name: riff.name,
      ratings: riff.ratings,
      author: riff.author,
      creationDate: riff.creationDate,
      fileName: riff.fileName,
      instrument: riff.instrument,
      hasBeenUsed: riff.hasBeenUsed,
    };
  }
}

export default new RiffAssembler();
