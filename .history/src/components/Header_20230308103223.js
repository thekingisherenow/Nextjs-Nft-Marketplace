// not use the manual way.just use the web3 kit way..
import Link from "next/link"
import React from "react"
import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <nav className="flex flex-row">
            <h1 className="text-4xl font-bold mr-auto">NFT Marketplace</h1>
            <div className="flex p-5">
                <Link className="px-4 py-2" href="/">
                    NFT Marketplace
                </Link>
                <Link className="px-4 py-2" href="/sell-nft">
                    Sell NFT
                </Link>
                <ConnectButton className="px-4" />
            </div>
        </nav>
    )
}

export default Header
