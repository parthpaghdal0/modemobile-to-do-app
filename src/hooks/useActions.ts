import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from 'ethers'

import ERC20JSON from '../abis/ERC20-ABI.json'
import ERC721JSON from '../abis/ERC721-ABI.json'

import { ERC20_ADDRESS, ERC721_ADDRESS } from '@/constants'

export const useActions = () => {
    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const mintToken = async () => {
        if (!isConnected || !walletProvider)
            return { success: false, message: "Wallet is not connected", tokenId: 0 };

        try {
            const ethersProvider = new ethers.BrowserProvider(walletProvider)
            const signer = await ethersProvider.getSigner()

            const nftContract = new ethers.Contract(ERC721_ADDRESS, ERC721JSON, signer);
            const tx = await nftContract.mint();
            const receipt = await tx.wait(5);
            const mintedTokenId = receipt.logs[0].topics[3];

            return { success: true, message: "", tokenId: mintedTokenId }
        }
        catch (err: any) {
            console.log(err)
            return { success: false, message: err.reason, tokenId: 0 }
        }
    };

    const burnToken = async (tokenId: number) => {
        if (!isConnected || !walletProvider)
            return { success: false, message: "Wallet is not connected" };

        try {
            const ethersProvider = new ethers.BrowserProvider(walletProvider)
            const signer = await ethersProvider.getSigner()

            const nftContract = new ethers.Contract(ERC721_ADDRESS, ERC721JSON, signer);
            const tx = await nftContract.burn(tokenId);
            await tx.wait(5);

            return { success: true, message: "" }
        }
        catch (err: any) {
            console.log(err)
            return { success: false, message: err.reason }
        }
    };

    return { mintToken, burnToken };
}