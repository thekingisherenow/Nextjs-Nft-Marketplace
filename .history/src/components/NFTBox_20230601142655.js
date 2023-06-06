import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { fs } from "fs"

export default function NFTBox({ price, marketplaceAddress, nftAddress, seller, tokenId }) {
    const [imageURI, setImageURI] = useState("")

    async function updateUI() {
        //get the token URI
        //using the image tag from the token URI,get the image

        //fs le file read garne .
        const readValue = fs.readFileSync("../constants/nftMarketplaceAbi.json", "utf-8")
        console.log("readValue", readValue)
        //
        const { data, isFetching } = useWeb3Contract({
            abi: usdcEthPoolAbi,
            contractAddress: usdcEthPoolAddress,
            functionName: "observe",
            params: {
                secondsAgos: [0, 10],
            },
        })
    }
}
