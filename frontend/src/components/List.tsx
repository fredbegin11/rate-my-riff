import { ArrowDownIcon } from '@heroicons/react/outline';
import ListLoading from './ListLoading';

interface Key {
  label: string;
  name: string;
  transformer?: (value: any) => string | React.ReactNode;
}

interface Action {
  onClick: (id: string) => void;
  label: string;
}

interface Props {
  keys: Key[];
  data: unknown[];
  isLoading: boolean;
  actions?: Action[];
  sortedBy?: string;
}

export default function List({ isLoading, data = [], keys, actions = [], sortedBy = 'averageRating' }: Props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {keys.map((key: Key) => (
                    <th key={key.name} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>{key.label}</span>
                      <span>{sortedBy === key.name && <ArrowDownIcon className="inline ml-2 -mt-1" width={15} />}</span>
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    {actions.map((action) => (
                      <td key={action.label} className="px-6 py-4 whitespace-nowrap">
                        <button type="button" className="btn btn-danger" onClick={() => action.onClick(item.id)}>
                          {action.label}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
                {isLoading && <ListLoading />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
