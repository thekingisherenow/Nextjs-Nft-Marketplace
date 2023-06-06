// not use the manual way.just use the web3 kit way..
import React from "react"
import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <nav>
            <ConnectButton />
        </nav>
    )
}

export default Header
