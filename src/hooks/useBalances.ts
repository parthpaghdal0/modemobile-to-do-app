import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { ethers } from 'ethers'

import ERC20JSON from '../abis/ERC20-ABI.json'
import ERC721JSON from '../abis/ERC721-ABI.json'

import { ERC20_ADDRESS, ERC721_ADDRESS } from '@/constants'
import { useEffect, useState } from 'react'

export const useBalances = () => {
    const [balance, setBalance] = useState(0);
    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const fetchBalance = async () => {
        if (!isConnected || !walletProvider) return;

        try {
            const ethersProvider = new ethers.BrowserProvider(walletProvider)
            const signer = await ethersProvider.getSigner()
    
            const tokenContract = new ethers.Contract(ERC20_ADDRESS, ERC20JSON, signer);
            const balance = await tokenContract.balanceOf(address);

            setBalance(balance);
        }
        catch (err: any) {
            console.log(err)
            return { success: false, message: err.reason }
        }
    };

    return { balance, fetchBalance };
}