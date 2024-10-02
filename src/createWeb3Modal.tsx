'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

const projectId = '10c3f4eecf1028fe1a8644acef29b6e9';

const amoy = {
    chainId: 80002,
    name: 'Polygon Amoy',
    currency: 'MATIC',
    explorerUrl: 'https://amoy.polygonscan.com/',
    rpcUrl: 'https://polygon-amoy.g.alchemy.com/v2/PBLcczu4HpQbz1pJi5TS2-f1hvtfTkLA'
}

const metadata = {
    name: 'ModeMobile ToDo App',
    description: 'ModeMobile App.',
    url: 'http://localhost:3000/',
    icons: []
}

const config = defaultConfig({
    metadata
});

createWeb3Modal({
    ethersConfig: config,
    chains: [amoy],
    projectId,
    enableAnalytics: true
})