import { Select, SelectProps } from '@mantine/core';

const DropDown = (props: SelectProps) => {
  const { label, placeholder, data, defaultValue } = props;

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      defaultValue={defaultValue}
    />
  );
};

export default DropDown;
