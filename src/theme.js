// src/theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // other light theme configurations
  },
  // Global styles
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#ffffff', // Set your light background color
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // other dark theme configurations
  },
  // Global styles
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#212121', // Set your dark background color
        },
      },
    },
  },
});
