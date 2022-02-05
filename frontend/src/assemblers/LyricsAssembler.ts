import { v4 as uuidv4 } from 'uuid';
import { CreateLyricsFormProps } from '../components/riffs/CreateLyricsForm';
import LyricsDto from '../dtos/LyricsDto';
import Lyrics from '../models/Lyrics';
import AuthClient from '../services/AuthClient';

class LyricsAssembler {
  fromForm({ name, lyrics }: CreateLyricsFormProps) {
    return new Lyrics({
      id: uuidv4(),
      name,
      ratings: {},
      author: AuthClient.getCurrentUserDisplayName(),
      creationDate: Date.now(),
      lyrics,
    });
  }

  fromDto(dto: LyricsDto) {
    return new Lyrics(dto);
  }

  toObject(lyrics: Lyrics) {
    return {
      id: lyrics.id,
      name: lyrics.name,
      ratings: lyrics.ratings,
      author: lyrics.author,
      creationDate: lyrics.creationDate,
      lyrics: lyrics.lyrics,
    };
  }
}

export default new LyricsAssembler();
