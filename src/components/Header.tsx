"use client"

import React from "react";

import Button from "./Button";
import { Stack } from "@mui/material";

const Header = () => {
    const handleConnect = () => {
    }

    const renderButton = () => {
        return <Button
            onClick={handleConnect}
        >
            Login
        </Button>
    }

    return (
        <header>
            <Stack padding={2} direction="row" justifyContent="end">
                {renderButton()}
            </Stack>
        </header>
    );
}

export default Header;
