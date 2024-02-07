import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import Checkbox, { CheckboxProps } from '@components/Checkbox';

interface ControlledCheckboxProps extends CheckboxProps {
  control: Control<any>;
  name: string;
}

const ControlledCheckbox = (props: ControlledCheckboxProps) => {
  const { control, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
      }) => (
        <Checkbox
          {...rest}
          inputProps={{ value, onChange, onBlur }}
        />
      )}
    />
  );
};

export default memo(ControlledCheckbox);
