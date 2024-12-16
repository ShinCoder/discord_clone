import { Avatar, AvatarProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavItemAvatar = styled(Avatar, {
  shouldForwardProp: (prop) =>
    prop !== 'active' && prop !== 'selectedBackgroundColor'
})<
  AvatarProps & {
    active?: boolean;
    selectedBackgroundColor?: string;
    color?: string;
  }
>(
  ({
    theme,
    active = false,
    selectedBackgroundColor = theme.palette.primary.main,
    color = theme.dcPalette.text.normal
  }) => ({
    width: '48px',
    height: '48px',
    color,
    fontSize: '1.125rem',
    fontWeight: 500,
    backgroundColor: theme.dcPalette.background.primary,
    cursor: 'pointer',
    transition: 'all 0.1s ease-out',

    ...(active && {
      color: theme.dcPalette.white.base,
      borderRadius: theme.dcShape.borderRadius.serverNav,
      backgroundColor: selectedBackgroundColor,

      '&+ * .nav-item-pill': {
        scale: '1 1'
      }
    }),

    ...(!active && {
      '&:hover': {
        color: theme.dcPalette.white.base,
        borderRadius: theme.dcShape.borderRadius.serverNav,
        backgroundColor: selectedBackgroundColor,

        '&+ * .nav-item-pill': {
          scale: '1 0.5'
        }
      }
    })
  })
);
