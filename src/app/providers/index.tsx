"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        mode: 'dark',
    },
});

export default function Provider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            {children}
        </LocalizationProvider>
    </ThemeProvider>
}