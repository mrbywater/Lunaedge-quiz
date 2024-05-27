import { TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import './SearchInput.scss';
import { ChangeEvent } from 'react';

type SearchInputProps = {
  setSearchQuery: (value: string) => void;
  searchQuery: string;
};

const SearchInput = (props: SearchInputProps) => {
  const { setSearchQuery, searchQuery } = props;

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextInput
      radius="xl"
      size="xs"
      placeholder="Filter by quizzes name"
      rightSectionWidth={42}
      className="searchInputMain"
      value={searchQuery}
      onChange={handleSearchInputChange}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      {...props}
    />
  );
};

export default SearchInput;
