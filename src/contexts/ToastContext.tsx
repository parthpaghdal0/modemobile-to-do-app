import React, { createContext, useContext, useState } from "react";
import { SnackbarKey, useSnackbar } from 'notistack';

import ToastContextProps from "@/interfaces/ToastContextProps";

const ToastContext = createContext<ToastContextProps>({
    showToast: (message: string) => { }
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showToast = (message: string) => {
        const key: SnackbarKey = enqueueSnackbar(message, {
            //action,
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            },
            variant: 'error',
            SnackbarProps: {
                onClick: () => closeSnackbar(key)
            }
        });
    }


    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToastContext() {
    return useContext(ToastContext);
}
