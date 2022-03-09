import classNames from 'classnames';
import { useTable, useSortBy, Cell } from 'react-table';
import Action from '../models/Action';
import ListLoading from './ListLoading';

interface Column {
  Header: string | React.FunctionComponent;
  accessor: string;
  transformer?: (value: any) => string | React.ReactNode;
  Cell?: (value: Cell) => string | React.ReactNode;
}

interface Props {
  columns: Column[];
  data: object[];
  isLoading: boolean;
  actions?: Action[];
}

export default function List({ isLoading, data = [], columns, actions = [] }: Props) {
  // @ts-ignore
  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } = useTable({ columns, data, autoResetSortBy: false }, useSortBy);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 border border-gray-200 bg-white">
              <thead className="bg-white border-b">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        scope="col"
                        className="min-w-96 px-4 py-4 text-left text-xs text-gray-500 uppercase tracking-wider"
                      >
                        {column.render('Header')}
                        {column.isSorted && <span>{column.isSortedDesc ? ' ↓' : ' ↑'}</span>}
                      </th>
                    ))}
                    {actions.length > 0 && (
                      <th scope="col" className="px-6 py-4 text-xs text-gray-500 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    )}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-300">
                {rows.map((row: any) => {
                  prepareRow(row);

                  return (
                    <tr
                      {...row.getRowProps()}
                      className={classNames('border-b border-gray-300', {
                        'opacity-50': !!row.original.hasBeenUsed,
                        'bg-gray-200': !!row.original.hasBeenUsed,
                      })}
                    >
                      {row.cells.map((cell: any) => (
                        <td {...cell.getCellProps()} className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cell.render('Cell')}</div>
                        </td>
                      ))}

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {actions.map((action, i) => {
                          const showBadge = row.original.comments && row.original.comments.length > 0;

                          return (
                            <button key={i} type="button" className="button ml-2" onClick={() => action.onClick(row.original.id)}>
                              {action.icon}
                              {action.render?.(showBadge)}
                            </button>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}

                {isLoading && <ListLoading />}
              </tbody>
            </table>

            {!isLoading && data.length === 0 && (
              <div className="flex justify-center py-12 bg-white">
                <span className="text-center">Rien à afficher icitte... Enwèye, va composer!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
