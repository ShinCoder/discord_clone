import { memo } from 'react';
import MUICheckbox, {
  CheckboxProps as MUICheckboxProps
} from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

export interface CheckboxProps {
  label: string;
  sx?: SxProps;
  inputProps?: MUICheckboxProps;
}

const Checkbox = (props: CheckboxProps) => {
  const { label, sx, inputProps } = props;

  return (
    <FormControlLabel
      control={
        <MUICheckbox
          {...inputProps}
          // sx={{
          //   ...inputProps?.sx
          // }}
          icon={
            <Box
              sx={{
                width: '24px',
                height: '24px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgb(128, 132, 142)',
                borderRadius: '6px',
                backgroundColor: 'transparent'
              }}
            />
          }
          checkedIcon={
            <Box
              sx={{
                width: '24px',
                height: '24px',
                color: 'common.white',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'primary.light',
                borderRadius: '6px',
                backgroundColor: 'primary.main'
              }}
            >
              <CheckIcon color='inherit' />
            </Box>
          }
        />
      }
      label={label}
      sx={{
        ...sx
      }}
      slotProps={{
        typography: {
          sx: {
            color: (theme) => theme.dcPalette.text.grey,
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: '1rem',
            userSelect: 'none'
          }
        }
      }}
    />
  );
};

export default memo(Checkbox);
