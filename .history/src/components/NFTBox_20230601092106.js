import { useState } from "react"
import { useWeb3Contract } from "react-moralis"

export default function NFTBox({ price, marketplaceAddress, nftAddress, seller, tokenId }) {
    const [imageURI, setImageURI] = useState("")

    async function updateUI() {
        //get the token URI
        //using the image tag from the token URI,get the image
        //
    }
}
