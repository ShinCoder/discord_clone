'use client';

import { memo, useId } from 'react';
import Box from '@mui/material/Box';
import Input, { InputProps } from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

export interface InputTextProps {
  label: string;
  isPassword?: boolean;
  isRequired?: boolean;
  inputProps?: InputProps;
  sx?: SxProps<Theme>;
  error?: string;
}

const InputText = (props: InputTextProps) => {
  const {
    label,
    isPassword = false,
    isRequired = false,
    inputProps,
    sx,
    error
  } = props;

  const theme = useTheme();
  const id = useId();

  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <InputLabel
        sx={{
          color: error && 'error.main',
          fontSize: '0.75rem',
          fontWeight: 700,
          lineHeight: '1rem',
          textTransform: 'uppercase',
          marginBottom: theme.spacing(1)
        }}
        htmlFor={id + '-input'}
      >
        {label}
        {isRequired && !error && (
          <Typography
            component='span'
            sx={{
              color: theme.dcPalette.red,
              font: 'inherit',
              lineHeight: 'inherit',
              paddingLeft: theme.spacing(0.5)
            }}
          >
            *
          </Typography>
        )}
        {error && (
          <Typography
            component='span'
            sx={{
              color: 'error.main',
              fontSize: '0.75rem',
              fontStyle: 'italic',
              fontWeight: 500,
              lineHeight: 'inherit',
              textTransform: 'none'
            }}
          >
            <Typography
              component='span'
              sx={{
                font: 'inherit',
                lineHeight: 'inherit',
                padding: `0 ${theme.spacing(0.5)}`
              }}
            >
              -
            </Typography>
            {error}
          </Typography>
        )}
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

export default memo(InputText);
