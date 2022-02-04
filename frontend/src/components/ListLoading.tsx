interface Props {
  nbOfColumns?: number;
}

const ListLoading = ({ nbOfColumns = 6 }: Props) => (
  <>
    {Array.from({ length: 10 }, () => (
      <tr className="animate-pulse py-6">
        {Array.from({ length: nbOfColumns }, () => (
          <td className="p-4">
            <div className="bg-gray-300  rounded-md px-6 py-4 whitespace-nowrap " />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default ListLoading;
