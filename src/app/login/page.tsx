"use client"

import { Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from '@web3modal/ethers/react'

export default function Login() {
    const { address, isConnected } = useWeb3ModalAccount()
    const router = useRouter();

    if (isConnected)
        router.push("/");

    return (
        <Stack margin="auto" padding={2}>
            <Typography variant="h4" className="text-primary">
                👋 Welcome to Mode Mobile
            </Typography>
        </Stack>
    );
}