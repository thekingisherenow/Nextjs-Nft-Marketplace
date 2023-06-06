import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"
import nftAbi from "../../constants/basicNftAbi.json"
import networkMapping from "../../constants/networkMapping.json"

export default function NFTBox({ price, marketplaceAddress, nftAddress, seller, tokenId }) {
    const [imageURI, setImageURI] = useState("")
    let chainId = process.env.chainId || "11155111"
    const contractAddress = networkMapping[chainId].NftMarketplace
    console.log("The contract address is " + contractAddress)

    const { data, isFetching } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: contractAddress,
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
