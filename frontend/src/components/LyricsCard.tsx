import Rating from 'react-rating';
import Lyrics from '../models/Lyrics';
import ratingFull from '../assets/rating_full.svg';
import ratingEmpty from '../assets/rating_empty.svg';
import DateService from '../services/DateService';
import Action from '../models/Action';

interface Props {
  lyrics: Lyrics;
  actions: Action[];
  addRating: (id: string, rating: number) => void;
}

const LyricsCard = ({ lyrics, actions, addRating }: Props) => {
  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 text-xl font-semibold">{lyrics.name}</h2>
          <div className="flex">
            {actions.map((action) => {
              const showBadge = lyrics.comments && lyrics.comments.length > 0;

              return (
                <button type="button" onClick={() => action.onClick(lyrics.id)}>
                  {action.icon}
                  {action.render?.(showBadge)}
                </button>
              );
            })}
          </div>
        </div>
        <hr />
        <p className="whitespace-pre-wrap mt-4 mb-6 text-gray-600">{lyrics.lyrics}</p>
        <hr />
        <h2 className="mt-6 text-gray-800 font-semibold">Auteur</h2>
        <h2 className="text-gray-800">{lyrics.author}</h2>

        <h2 className="mt-4 text-gray-800 font-semibold">Date</h2>
        <h2 className="text-gray-800">{DateService.format(lyrics.creationDate)}</h2>
      </div>
      <h2 className="mt-4 mb-1 text-gray-800 font-semibold">Note Moyenne</h2>
      <Rating
        readonly
        initialRating={lyrics.averageRating}
        emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
        fullSymbol={<img width={35} alt="full" src={ratingFull} />}
        className="w-48"
      />
      <h2 className="mt-4 mb-1 text-gray-800 font-semibold">Ma Note</h2>
      <Rating
        initialRating={lyrics.myRating}
        emptySymbol={<img width={35} alt="empty" src={ratingEmpty} />}
        fullSymbol={<img width={35} alt="full" src={ratingFull} />}
        onClick={(rating) => addRating(lyrics.id, rating)}
        className="w-48"
      />
    </div>
  );
};

export default LyricsCard;
