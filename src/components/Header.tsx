"use client"

import React, { useEffect } from "react";
import { ethers } from 'ethers'

import Button from "./Button";
import { Stack } from "@mui/material";
import { useWeb3ModalAccount, useWeb3Modal, useWeb3ModalProvider, useDisconnect } from "@web3modal/ethers/react";

import '../createWeb3Modal';

const Header = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const { disconnect } = useDisconnect();
    const { walletProvider } = useWeb3ModalProvider();
    const { open } = useWeb3Modal();

    useEffect(() => {
        const signMessage = async () => {
            if (!walletProvider) return;
            const ethersProvider = new ethers.BrowserProvider(walletProvider)
            const signer = await ethersProvider.getSigner();
            await signer.signMessage("ModeMobile To Do App");
        }
        if (isConnected) {
            signMessage();
        }
    }, [isConnected])

    const handleConnect = () => {
        open();
    }

    const handleDisconnect = () => {
        disconnect();
    }

    const renderButton = () => {
        if (!isConnected)
            return <Button
                onClick={handleConnect}
            >
                Login
            </Button>
        else
            return <Button
                onClick={handleDisconnect}
            >
                Logout
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
