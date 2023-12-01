'use client';

import Modal from '@components/Modal';
import CustomButton from '@elements/CustomButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function Test() {
  const [state, setState] = useState(false);

  return (
    <div>
      <button onClick={() => setState((state) => !state)}>click</button>
      <Modal
        open={state}
        handleClose={() => setState(false)}
      >
        <Typography
          variant='h1'
          color='text.primary'
          align='center'
        >
          Verify by Email
        </Typography>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          align='center'
        >
          Please check your email and follow the instructions to verify your
          account. If you did not receive an email or if it expired, you can
          resend one.
        </Typography>
        <CustomButton
          sx={{ width: '100%', marginTop: (theme) => theme.spacing(2.5) }}
          variant='white'
        >
          Resend my verification email!
        </CustomButton>
      </Modal>
    </div>
  );
}

export default Test;
