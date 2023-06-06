import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"
import nftAbi from "../../constants/basicNftAbi.json"

export default function NFTBox({ nftAddress, tokenId }) {
    // const [imageURI, setImageURI] = useState("")
    const { isWeb3Enabled } = useMoralis()
    console.log("tokenId", tokenId)
    console.log("nftAddress", nftAddress)
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId,
        },
    })

    async function updateUI() {
        //get the token URI
        //using the image tag from the token URI,get the image
        const tokenURI = await getTokenURI()
        console.log("tokenURI", tokenURI)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
}
