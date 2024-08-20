import Box from '@mui/material/Box';

interface VerticalSeperatorProps {
  radius: string;
}

const VerticalSeperator = (props: VerticalSeperatorProps) => {
  const { radius } = props;
  return (
    <Box
      sx={{
        height: 0,
        margin: `0 ${radius}`
      }}
    />
  );
};

export default VerticalSeperator;
