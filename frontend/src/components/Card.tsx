interface Action {
  onClick: () => void;
  icon: React.ReactNode;
}

interface Props {
  title: string;
  content: string;
  author: string;
  action: Action;
  footer?: React.ReactNode;
}

const Card = ({ title, content, author, action, footer }: Props) => {
  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-xl font-semibold">{title}</h2>
          <button type="button" onClick={action.onClick}>
            {action.icon}
          </button>
        </div>
        <p className="whitespace-pre-wrap mt-4 text-gray-600">{content}</p>
        <h2 className="mt-4 text-gray-800 font-semibold">- {author}</h2>
      </div>
      {footer}
    </div>
  );
};

export default Card;
