import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"
import nftAbi from "../../constants/basicNftAbi.json"

export default function NFTBox({ price, marketplaceAddress, nftAddress, seller, tokenId }) {
    const [imageURI, setImageURI] = useState("")

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId,
        },
    })
    updateUI()

    async function updateUI() {
        //get the token URI
        //using the image tag from the token URI,get the image
        //
    }
}
