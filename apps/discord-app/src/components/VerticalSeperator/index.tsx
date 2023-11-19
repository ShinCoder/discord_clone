import Box from '@mui/material/Box';

interface VerticalSeperatorProps {
  radius: string;
}

const VerticalSeperator = (props: VerticalSeperatorProps) => {
  const { radius } = props;
  console.log(typeof window);
  return (
    <Box
      sx={{
        height: 0,
        margin: `0 ${radius}`,
        border: (theme) => `1px solid ${theme.dcPalette.grey.accent}`
      }}
    />
  );
};

export default VerticalSeperator;
