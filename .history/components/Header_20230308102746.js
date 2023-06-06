// not use the manual way.just use the web3 kit way..
import React from "react"
import { useMoralis } from "react-moralis"
import { ConnectButton, Link } from "web3uikit"

const Header = () => {
    return (
        <nav>
            <Link href="/">
                <a>NFT Marketplace</a>
            </Link>
            <Link href="/sell-nft">
                <a>Sell NFT</a>
            </Link>
            <ConnectButton />
        </nav>
    )
}

export default Header
