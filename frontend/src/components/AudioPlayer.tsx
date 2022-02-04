import { memo, useEffect, useState } from 'react';
import Riff from '../models/Riff';

interface Props {
  riff: Riff;
}

const AudioPlayer = ({ riff }: Props) => {
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    riff.getUrl().then((url) => setAudioUrl(url));
  }, []);

  if (!audioUrl) {
    return (
      <div className="flex animate-pulse h-full space-x-5">
        <div className="w-48 bg-gray-300 h-12 rounded-md" />
      </div>
    );
  }

  return (
    <audio controls>
      <source src={audioUrl} />
    </audio>
  );
};

export default memo(AudioPlayer);
