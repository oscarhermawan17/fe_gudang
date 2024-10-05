import { Box, Typography, useTheme } from '@mui/material';

const FooterComponent = () => {
  const theme = useTheme();

  return (
    <footer>
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          bgcolor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center',
          py: 2,
        }}
      >
        <Typography variant="body2">
          Copyright Toko Alpha 2024
        </Typography>
      </Box>
    </footer>
  )
}

export default FooterComponent;