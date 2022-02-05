import { v4 as uuidv4 } from 'uuid';
import { CreateRiffFormProps } from '../components/riffs/CreateRiffForm';
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
    };
  }
}

export default new RiffAssembler();
