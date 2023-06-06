import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"
import nftAbi from "../../constants/basicNftAbi.json"

export default function NFTBox({ nftAddress, tokenId }) {
    const [imageURI, setImageURI] = useState("")
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
        //now not everyone is going to have an IPFS compatible browser.
        //So we cheat a little bit.
        if (tokenURI) {
            //IPFS gateway : A server that will return IPFS files from a normal URL.
            const requestURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const data = await (await fetch(requestURI)).json()
            const imageURI = data.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs/io/ipfs")
            console.log("imagURIURL", imageURIURL)
            setImageURI(imageURIURL)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div>heyy</div>
            <div>{imageURI}</div>
        </div>
    )
}
