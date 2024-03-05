import { memo } from 'react';
import MUIInputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface InputLabelProps {
  label: string;
  error?: string;
  isRequired?: boolean;
  htmlFor?: string;
}

const InputLabel = (props: InputLabelProps) => {
  const { label, error, isRequired = false, htmlFor } = props;

  const theme = useTheme();

  return (
    <MUIInputLabel
      sx={{
        color: error && 'error.main',
        fontSize: '0.75rem',
        fontWeight: 700,
        lineHeight: '1rem',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(1),
        userSelect: 'none'
      }}
      htmlFor={htmlFor}
    >
      {label}
      {isRequired && !error && (
        <Typography
          component='span'
          sx={{
            color: theme.dcPalette.status.danger,
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
    </MUIInputLabel>
  );
};

export default memo(InputLabel);
