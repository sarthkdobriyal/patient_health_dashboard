import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTable, useSortBy, Column, Row } from 'react-table';
import { Link } from 'react-router-dom';
import { authClient } from '../utils/api-client';
import { Patient } from '../utils/types';
import PatientFilters from './PatientFilters';

const PatientList: React.FC = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => authClient.get('/patients/all'),
  });

  const patients: Patient[] = useMemo(() => data?.data || [], [data]);

  const [searchQuery, setSearchQuery] = useState('');
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearchQuery = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAgeRange =
        (minAge === null || patient.age >= minAge) && (maxAge === null || patient.age <= maxAge);
      return matchesSearchQuery && matchesAgeRange;
    });
  }, [patients, searchQuery, minAge, maxAge]);

  const columns: Column<Patient>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => value || '-',
        sortType: (rowA: Row<Patient>, rowB: Row<Patient>) => {
          const a = rowA.original.name || '';
          const b = rowB.original.name || '';
          return a.localeCompare(b);
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
        Cell: ({ value }) => value || '-',
        sortType: (rowA: Row<Patient>, rowB: Row<Patient>) => {
          const a = rowA.original.age || 0;
          const b = rowB.original.age || 0;
          return a - b;
        },
      },
      {
        Header: 'Condition',
        accessor: 'condition',
        Cell: ({ value }) => value || '-',
        sortType: (rowA: Row<Patient>, rowB: Row<Patient>) => {
          const a = rowA.original.condition || '';
          const b = rowB.original.condition || '';
          return a.localeCompare(b);
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ value }) => value || '-',
        sortType: (rowA: Row<Patient>, rowB: Row<Patient>) => {
          const a = rowA.original.email || '';
          const b = rowB.original.email || '';
          return a.localeCompare(b);
        },
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        Cell: ({ value }) => value || '-',
        sortType: (rowA: Row<Patient>, rowB: Row<Patient>) => {
          const a = rowA.original.phone || '';
          const b = rowB.original.phone || '';
          return a.localeCompare(b);
        },
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex space-x-4 items-center justify-end w-full">
            <Link to={`/patient/${value}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
            <Link to={`/prior-auth/${value}`} className="text-blue-500 hover:underline">
              <button className="bg-blue-500 mx-auto text-white px-2 py-1 rounded hover:bg-blue-600">
                Submit Authorization
              </button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: filteredPatients }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">Error fetching patients</div>;

  return (
    <div className='px-4 text-xs md:text-base'>
      <PatientFilters
        onSearch={setSearchQuery}
        onAgeRangeChange={(min, max) => {
          setMinAge(min);
          setMaxAge(max);
        }}
      />
      {filteredPatients.length === 0 ? (
        <div>No patients found.</div>
      ) : (
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map((column) => (
                  <th
                    //@ts-expect-error working
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    //@ts-expect-error working
                    className={`py-2 px-4 border-b ${column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''}`}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id} className="py-2 px-4 border-b text-center">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;