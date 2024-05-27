import { Select, SelectProps } from '@mantine/core';

interface DropDownProps extends SelectProps {
  setSelectedOption: (value: string) => void;
  value: string;
}

const DropDown = (props: DropDownProps) => {
  const { label, placeholder, data, setSelectedOption, value } = props;

  const handleSelect = () => (event: any) => setSelectedOption(event);

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      allowDeselect={false}
      value={value}
      onChange={handleSelect()}
    />
  );
};

export default DropDown;
