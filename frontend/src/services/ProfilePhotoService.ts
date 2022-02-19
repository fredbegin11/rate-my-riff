import madness from '../assets/madness.png';
import lacoche from '../assets/lacoche.png';
import ticuir from '../assets/ticuir.png';
import renefournaise from '../assets/renefournaise.png';

interface Props {
  name?: string | null;
}

class ProfilePhotoService {
  getProfilePhoto = ({ name }: Props) => {
    switch (name) {
      case 'Frédéric Bégin':
        return renefournaise;
      case 'Marc-Antoine Talbot':
        return madness;
      case 'Jean-François Bouchard':
        return lacoche;
      case "Vincent D'amour":
        return ticuir;
      default:
        return undefined;
    }
  };
}

export default new ProfilePhotoService();
