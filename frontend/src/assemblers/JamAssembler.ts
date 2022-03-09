import { v4 as uuidv4 } from 'uuid';
import { CreateJamFormProps } from '../components/form/CreateJamForm';
import JamDto from '../dtos/JamDto';
import Jam from '../models/Jam';
import AuthClient from '../services/AuthClient';

class JamAssembler {
  fromForm({ url, name }: CreateJamFormProps) {
    return new Jam({
      id: uuidv4(),
      name,
      ratings: {},
      author: AuthClient.getCurrentUserDisplayName(),
      creationDate: Date.now(),
      url,
      hasBeenUsed: false,
    });
  }

  fromDto(dto: JamDto) {
    return new Jam(dto);
  }

  toObject(jam: JamDto) {
    return {
      id: jam.id,
      name: jam.name,
      ratings: jam.ratings,
      author: jam.author,
      creationDate: jam.creationDate,
      url: jam.url,
      hasBeenUsed: jam.hasBeenUsed,
    };
  }
}

export default new JamAssembler();
