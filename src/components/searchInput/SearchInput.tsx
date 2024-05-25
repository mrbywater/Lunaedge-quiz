import { TextInput, TextInputProps, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import './SearchInput.scss';

const SearchInput = (props: TextInputProps) => {
  return (
    <TextInput
      radius="xl"
      size="xs"
      placeholder="Filter by quizzes name"
      rightSectionWidth={42}
      className="searchInputMain"
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      {...props}
    />
  );
};

export default SearchInput;
