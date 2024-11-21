import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { ellipsisTextWrapStyle } from '@utils';

interface SectionHeaderProps {
  label: string;
  disableAction?: boolean;
  actionButton?: ReactNode;
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { label, disableAction = false, actionButton } = props;

  return (
    <Box
      component='h2'
      sx={{
        height: '40px',
        display: 'flex',
        color: (theme) => theme.dcPalette.text.muted,
        padding: (theme) =>
          `${theme.spacing(2.25)} ${theme.spacing(1)} ${theme.spacing(
            0.5
          )} ${theme.spacing(1.25)}`,
        transition: 'all 0.2s',

        '&:hover': {
          color: (theme) => theme.dcPalette.text.normal
        }
      }}
    >
      <Typography
        sx={{
          flex: 1,
          color: 'inherit',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          lineHeight: '16px',
          cursor: 'default',
          transition: 'inherit',

          ...{ ellipsisTextWrapStyle }
        }}
      >
        {label}
      </Typography>
      {!disableAction && actionButton}
    </Box>
  );
};

export default SectionHeader;
