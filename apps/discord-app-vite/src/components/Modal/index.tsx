import { ReactNode } from 'react';
import MUIModal from '@mui/material/Modal';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';

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
