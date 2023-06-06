import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"
import nftAbi from "../../constants/basicNftAbi.json"

export default function NFTBox({ price, marketplaceAddress, nftAddress, seller, tokenId }) {
    const [imageURI, setImageURI] = useState("")
    updateUI()

    async function updateUI() {
        //get the token URI
        //using the image tag from the token URI,get the image
        console.log("nftMakarketplaceAbi", nftMarketplaceAbi)
        //
        const { data, isFetching } = useWeb3Contract({
            abi: usdcEthPoolAbi,
            contractAddress: nftAbi,
            functionName: "observe",
            params: {
                secondsAgos: [0, 10],
            },
        })
    }
}
