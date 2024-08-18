'use client';

import { memo, useId, useState } from 'react';
import Box from '@mui/material/Box';
import Input, { InputProps } from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';

import InputLabel from '@components/InputLabel';

export interface InputTextProps {
  label: string;
  helperText?: string;
  showHelperText?: boolean;
  helperTextMode?: 'permanent' | 'onFocus';
  isPassword?: boolean;
  isRequired?: boolean;
  inputProps?: InputProps;
  sx?: SxProps<Theme>;
  error?: string;
}

const InputText = (props: InputTextProps) => {
  const {
    label,
    helperText,
    showHelperText = false,
    helperTextMode = 'permanent',
    isPassword = false,
    isRequired = false,
    inputProps,
    sx,
    error
  } = props;

  const theme = useTheme();
  const id = useId();

  const [helperTextState, setHelperTextState] = useState(showHelperText);

  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <InputLabel
        label={label}
        error={error}
        isRequired={isRequired}
        htmlFor={id + '-input'}
      />
      <Input
        id={id + '-input'}
        type={isPassword ? 'password' : 'text'}
        sx={{
          width: '100%',
          height: '40px',
          color: theme.dcPalette.text.normal,
          borderRadius: theme.dcShape.borderRadius.input,
          backgroundColor: theme.dcPalette.background.tertiary,
          '&::before, &::after': { content: 'none' }
        }}
        inputProps={{
          sx: {
            padding: theme.spacing(1.25),
            borderRadius: theme.dcShape.borderRadius.input
          }
        }}
        {...inputProps}
        onFocus={(e) => {
          inputProps?.onFocus?.(e);
          if (helperTextMode === 'onFocus') setHelperTextState(true);
        }}
        onBlur={(e) => {
          inputProps?.onBlur?.(e);
          if (helperTextMode === 'onFocus') setHelperTextState(false);
        }}
      />
      {helperText && (
        <Collapse
          in={helperTextMode === 'permanent' ? true : helperTextState}
          collapsedSize='0'
        >
          <FormHelperText
            sx={{
              display: 'block',
              height: '18px',
              color: theme.dcPalette.text.normal,
              fontSize: '0.875rem',
              lineHeight: '1.125rem',
              fontWeight: 400,
              paddingBottom: theme.spacing(2.5),
              boxSizing: 'content-box'
            }}
          >
            {helperText}
          </FormHelperText>
        </Collapse>
      )}
    </Box>
  );
};

export default memo(InputText);
