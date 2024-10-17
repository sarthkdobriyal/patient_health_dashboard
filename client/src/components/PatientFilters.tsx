import React, { useState } from 'react';

interface PatientFiltersProps {
  onSearch: (query: string) => void;
  onAgeRangeChange: (minAge: number | null, maxAge: number | null) => void;
}

const PatientFilters: React.FC<PatientFiltersProps> = ({ onSearch, onAgeRangeChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minAge, setMinAge] = useState<number | string>('');
  const [maxAge, setMaxAge] = useState<number | string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    if (typeof value === 'number' && (value < 0 || value > 100)) {
      value = value < 0 ? 0 : 100;
    }
    setMinAge(value);
    //@ts-expect-error working
    onAgeRangeChange(value === '' ? null : value, maxAge === '' ? null : (maxAge as number));
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    if (typeof value === 'number' && (value < 0 || value > 100)) {
      value = value < 0 ? 0 : 100;
    }
    setMaxAge(value);
    //@ts-expect-error working
    onAgeRangeChange(minAge === '' ? null : (minAge as number), value === '' ? null : value);
  };

  return (
    <div className="flex justify-end space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Min Age"
        value={minAge}
        onChange={handleMinAgeChange}
        className="p-2 border rounded w-20"
      />
      <input
        type="number"
        placeholder="Max Age"
        value={maxAge}
        onChange={handleMaxAgeChange}
        className="p-2 border rounded w-20"
      />
    </div>
  );
};

export default PatientFilters;