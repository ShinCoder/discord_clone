import {
  Box,
  MenuItem,
  Select as MUISelect,
  SelectChangeEvent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

import { inputScrollbarStyle } from '@utils';

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
              ? theme.dcPalette.text.muted
              : theme.dcPalette.interactive.normal,
          fontWeight: 500,
          borderRadius: theme.dcShape.borderRadius.input,
          backgroundColor: theme.dcPalette.background.tertiary,

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
              backgroundColor: theme.dcPalette.background.secondary
            }
          },
          slotProps: {
            paper: { sx: { maxHeight: '215px', ...inputScrollbarStyle } }
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
