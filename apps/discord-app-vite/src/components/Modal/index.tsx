import { ReactNode } from 'react';
import { Box, Modal as MUIModal, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  width?: string;
}

const Modal = (props: ModalProps) => {
  const theme = useTheme();
  const {
    children,
    open,
    handleClose,
    width = theme.dcShape.defaultWidth.modal
  } = props;

  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      // slots={{ backdrop: Backdrop }}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Zoom in={open}>
        <Box
          sx={{
            width,
            padding: (theme) => theme.spacing(2),
            borderRadius: (theme) => theme.dcShape.borderRadius.modal,
            backgroundColor: 'background.default'
          }}
        >
          {children}
        </Box>
      </Zoom>
    </MUIModal>
  );
};

export default Modal;
