"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline';
import { ToDoProvider } from '@/contexts/ToDoContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';

import { styled } from '@mui/styles';

const darkTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        mode: 'dark',
    },
});

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-info': {
        "& svg": {
            color: "#E52B67"
        }
    },
    '&.notistack-MuiContent': {
        backgroundColor: '#0F0F0F',
        padding: "4px 16px",
        borderRadius: "12px",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: "24px",
        color: "#FFF"
    },
}));

export default function Provider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarProvider
                Components={{
                    success: StyledMaterialDesignContent,
                    info: StyledMaterialDesignContent,
                }}
                maxSnack={3}>
                <ToastProvider>
                    <ToDoProvider>
                        <CssBaseline />
                        {children}
                    </ToDoProvider>
                </ToastProvider>
            </SnackbarProvider>
        </LocalizationProvider>
    </ThemeProvider>
}