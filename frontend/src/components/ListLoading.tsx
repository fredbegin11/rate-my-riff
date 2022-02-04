interface Props {
  nbOfColumns?: number;
}

const ListLoading = ({ nbOfColumns = 6 }: Props) => (
  <>
    {Array.from({ length: 10 }, (_x, x) => (
      <tr key={x} className="animate-pulse py-6">
        {Array.from({ length: nbOfColumns }, (_i, i) => (
          <td key={i} className="p-4">
            <div className="bg-gray-300  rounded-md px-6 py-4 whitespace-nowrap " />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default ListLoading;
