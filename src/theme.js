// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB5533', // Shopee's primary color
    },
    secondary: {
      main: '#FFD100', // Shopee's secondary color
    },
    background: {
      default: '#f5f5f5', // Shopee's background color
    },
    text: {
      primary: '#212121', // Shopee's primary text color
      secondary: '#757575', // Shopee's secondary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
