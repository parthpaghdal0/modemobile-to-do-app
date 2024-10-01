import React from "react";

import { Typography, Stack } from "@mui/material";

const Footer = () => {
    return (
        <footer>
            <Stack padding={2} textAlign="center">
                <Typography>
                    @ 2024 modemobile.com
                </Typography>
            </Stack>
        </footer>
    );
};

export default Footer;