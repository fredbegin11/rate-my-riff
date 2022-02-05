import ListLoading from './ListLoading';

interface Key {
  label: string;
  name: string;
  transformer?: (value: any) => string | React.ReactNode;
}

interface Action {
  onClick: (id: string) => void;
  icon: React.ReactNode;
}

interface Props {
  keys: Key[];
  data: unknown[];
  isLoading: boolean;
  actions?: Action[];
}

export default function List({ isLoading, data = [], keys, actions = [] }: Props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {keys.map((key: Key) => (
                    <th
                      key={key.name}
                      scope="col"
                      className="min-w-96 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key.label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item: any) => (
                  <tr key={item.id}>
                    {keys.map((key: Key) => (
                      <td key={key.name} className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{key.transformer ? key.transformer(item) : item[key.name]}</div>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {actions.map((action, i) => (
                        <button key={i} type="button" className="button ml-2" onClick={() => action.onClick(item.id)}>
                          {action.icon}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}

                {isLoading && <ListLoading />}
              </tbody>
            </table>
            {!isLoading && data.length === 0 && (
              <div className="flex justify-center py-12">
                <span className="text-center">Rien à afficher icitte... Enwèye, va composer!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
