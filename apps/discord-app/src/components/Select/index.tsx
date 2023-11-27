import Box from '@mui/material/Box';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SxProps, useTheme } from '@mui/material/styles';

import { scrollbarStyle } from '@constants';

interface SelectProps {
  value?: string;
  handleChange: (event: SelectChangeEvent) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder: string;
  placeholderWhen?: string;
}

const Select = (props: SelectProps) => {
  const {
    value,
    handleChange,
    options,
    placeholder,
    placeholderWhen = ''
  } = props;

  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <MUISelect
        sx={{
          width: '100%',
          height: '40px',
          color:
            value === placeholderWhen
              ? theme.dcPalette.text.grey
              : 'text.secondary',
          fontWeight: 500,
          borderRadius: theme.dcShape.borderRadius.input,
          backgroundColor: theme.dcPalette.grey.darkest,

          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0 !important'
          },

          '& .MuiSvgIcon-root': {
            color: 'text.secondary'
          }
        }}
        IconComponent={ExpandMoreIcon}
        value={value}
        onChange={handleChange}
        MenuProps={{
          MenuListProps: {
            sx: {
              backgroundColor: theme.dcPalette.grey.dark
            }
          },
          slotProps: {
            paper: { sx: { maxHeight: '215px', ...scrollbarStyle } }
          },
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        }}
        displayEmpty
        renderValue={(value: string) =>
          value === placeholderWhen
            ? placeholder
            : options.find((i) => i.value === value)?.label
        }
      >
        {options.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </MUISelect>
    </Box>
  );
};

export default Select;
