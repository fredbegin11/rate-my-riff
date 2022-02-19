import { LockOpenIcon, PlusIcon, SaveIcon, TrashIcon } from '@heroicons/react/outline';
import ButtonLoadingIcon from './ButtonLoadingIcon';

type ButtonType = 'Add' | 'Save' | 'Delete' | 'Login';

interface Props {
  label: string;
  type: ButtonType;
  isLoading?: boolean;
}

const getIcon = (type: ButtonType) => {
  switch (type) {
    case 'Add':
      return PlusIcon;
    case 'Save':
      return SaveIcon;
    case 'Login':
      return LockOpenIcon;
    default:
      return TrashIcon;
  }
};

const SubmitButton = ({ label, type, isLoading }: Props) => {
  const Icon = getIcon(type);

  return (
    <button
      type="submit"
      className="mb-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        {isLoading ? <ButtonLoadingIcon /> : <Icon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400" aria-hidden="true" />}
      </span>
      {label}
    </button>
  );
};

export default SubmitButton;
