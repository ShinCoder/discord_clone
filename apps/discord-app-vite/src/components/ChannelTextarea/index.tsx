import { KeyboardEvent, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Input } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import GifBoxIcon from '@mui/icons-material/GifBox';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import { ActionIconWrapper } from './elements';
import { getScrollbarStyle } from '@utils';

interface ChannelTextareaProps {
  onSubmit: (data: { message: string }) => void;
}

interface FormData {
  message: string;
}

const ChannelTextarea = (props: ChannelTextareaProps) => {
  const { onSubmit } = props;

  const schema = useMemo(
    () =>
      joi.object({
        message: joi.string().required()
      }),
    []
  );

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    resolver: joiResolver(schema),
    defaultValues: {
      message: ''
    }
  });
  const formValues = watch();

  const customOnSubmit = useCallback(
    (data: { message: string }) => {
      onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        setValue('message', formValues.message + '\n');
      } else {
        event.preventDefault();
        handleSubmit(customOnSubmit)();
      }
    }
  };

  const theme = useTheme();

  return (
    <Box
      component='form'
      sx={{
        padding: '0 16px',
        marginBottom: '24px'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          maxHeight: theme.dcShape.maxHeight.customChannelTextArea,
          paddingLeft: '16px',
          borderRadius: '8px',
          backgroundColor: theme.dcPalette.channel.textareaBackground,
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollbarGutter: 'stable',
          ...getScrollbarStyle('thin')
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            color: theme.dcPalette.interactive.normal,
            padding: '10px 16px',
            marginLeft: '-16px',
            cursor: 'pointer',

            '&:hover': {
              color: theme.dcPalette.interactive.hover
            }
          }}
        >
          <AddCircleIcon
            sx={{
              width: '24px',
              height: '24px'
            }}
          />
        </Box>
        <Input
          disableUnderline
          multiline
          fullWidth
          sx={{ padding: '11px 10px 11px 0' }}
          {...register('message')}
          onKeyDown={handleKeyDown}
        />
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            height: '44px'
          }}
        >
          <ActionIconWrapper>
            <RedeemIcon
              sx={{
                width: '24px',
                height: '24px'
              }}
            />
          </ActionIconWrapper>
          <ActionIconWrapper>
            <GifBoxIcon
              sx={{
                width: '24px',
                height: '24px'
              }}
            />
          </ActionIconWrapper>
          <ActionIconWrapper>
            <StickyNote2Icon
              sx={{
                width: '24px',
                height: '24px'
              }}
            />
          </ActionIconWrapper>
          <ActionIconWrapper>
            <EmojiEmotionsIcon
              sx={{
                width: '24px',
                height: '24px'
              }}
            />
          </ActionIconWrapper>
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelTextarea;
