import { Control, Controller } from 'react-hook-form';

import InputText, { InputTextProps } from '../InputText';

interface ControlledInputText extends InputTextProps {
  control: Control<any>;
  name: string;
}

const ControlledInputText = (props: ControlledInputText) => {
  const { control, name, ...rest } = props;

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
          inputProps={{ onChange, onBlur, value }}
          error={error?.message}
        />
      )}
    />
  );
};

export default ControlledInputText;
