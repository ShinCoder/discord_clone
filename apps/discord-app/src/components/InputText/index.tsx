'use client';

import { useId } from 'react';
import Box from '@mui/material/Box';
import Input, { InputProps } from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

export interface InputTextProps {
  label: string;
  isPassword?: boolean;
  inputProps?: InputProps;
  sx?: SxProps<Theme>;
}

const InputText = (props: InputTextProps) => {
  const { label, isPassword = false, inputProps, sx } = props;

  const theme = useTheme();
  const id = useId();

  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <InputLabel
        sx={{
          fontSize: '0.75rem',
          fontWeight: 700,
          lineHeight: '1rem',
          textTransform: 'uppercase',
          marginBottom: theme.spacing(1)
        }}
        htmlFor={id + '-input'}
      >
        {label}
      </InputLabel>
      <Input
        id={id + '-input'}
        type={isPassword ? 'password' : 'text'}
        sx={{
          width: '100%',
          height: '40px',
          color: theme.dcPalette.input,
          borderRadius: theme.dcShape.borderRadius.input,
          backgroundColor: theme.dcPalette.grey.darkest,
          '&::before, &::after': { content: 'none' }
        }}
        inputProps={{
          sx: {
            padding: theme.spacing(1.25),
            borderRadius: theme.dcShape.borderRadius.input
          }
        }}
        {...inputProps}
      />
    </Box>
  );
};

export default InputText;
