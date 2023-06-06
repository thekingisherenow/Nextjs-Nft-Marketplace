// not use the manual way.just use the web3 kit way..
import Link from "next/link"
import React from "react"
import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <nav>
            <h1 className="text-4xl font-bold">NFT Marketplace</h1>
            <Link href="/">NFT Marketplace</Link>
            <Link href="/sell-nft">Sell NFT</Link>
            <ConnectButton />
        </nav>
    )
}

export default Header
