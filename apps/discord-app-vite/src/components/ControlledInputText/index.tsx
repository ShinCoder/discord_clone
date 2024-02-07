import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import InputText, { InputTextProps } from '../InputText';

interface ControlledInputText extends InputTextProps {
  control: Control<any>;
  name: string;
}

const ControlledInputText = (props: ControlledInputText) => {
  const { control, name, inputProps, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
      }) => (
        <InputText
          {...rest}
          inputProps={{
            ...inputProps,
            onChange: (e) => {
              inputProps?.onChange?.(e);
              onChange(e);
            },
            onBlur: (e) => {
              inputProps?.onBlur?.(e);
              onBlur();
            }
          }}
          error={error?.message}
        />
      )}
    />
  );
};

export default memo(ControlledInputText);
