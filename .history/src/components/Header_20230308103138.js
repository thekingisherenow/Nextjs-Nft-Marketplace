// not use the manual way.just use the web3 kit way..
import Link from "next/link"
import React from "react"
import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <nav className="flex flex-row">
            <h1 className="text-4xl font-bold mr-auto">NFT Marketplace</h1>
            <div>
                <Link className="px-4" href="/">
                    NFT Marketplace
                </Link>
                <Link className="px-4" href="/sell-nft">
                    Sell NFT
                </Link>
                <ConnectButton />
            </div>
        </nav>
    )
}

export default Header
