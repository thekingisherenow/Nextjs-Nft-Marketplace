import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"
import nftAbi from "../../constants/basicNftAbi.json"
import Image from "next/image"
import { Card } from "web3uikit"
import { ethers } from "ethers"
import UpdateListingModal from "./UpdateListingModal"

const truncateStr = (fullStr, strLen) => {
    if (fullStr <= strLen) return fullStr

    const seperator = "..."
    const seperatorLength = seperator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    //
    return fullStr.substring(0, frontChars) + seperator + fullStr.substring(backChars, strLen)
}

export default function NFTBox({ nftAddress, tokenId, price, seller, marketplaceAddress }) {
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [showModal, setShowModal] = useState(false)

    const { isWeb3Enabled, account } = useMoralis()
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

    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "buyItem",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
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
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            console.log("imagURIURL", imageURIURL)
            setImageURI(imageURIURL)
            setTokenName(data.name)
            setTokenDescription(data.description)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const isOwnedByUser = seller === account || seller === undefined

    function handleCardClick() {
        //show modal else show buy iTem option.
        isOwnedByUser
            ? setShowModal(true)
            : buyItem({
                  onError: (e) => console.log(e),
              })
    }

    console.log("account", account)
    console.log("seller", seller)
    console.log(seller === account)
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateStr(seller || "", 15)
    return (
        <div>
            <div>
                <div>
                    <UpdateListingModal
                        isVisible={showModal}
                        marketplaceAddress={marketplaceAddress}
                        nftAddress={nftAddress}
                        tokenId={tokenId}
                        onClose={() => setShowModal(false)}
                    />
                    <Card
                        title={tokenName}
                        onClick={handleCardClick}
                        description={tokenDescription}
                    >
                        <div className="p-2 ">
                            <div className="flex flex-col items-end gap-2 ">
                                <div>#{tokenId}</div>
                                <div className="italic text-sm">
                                    Owned by : {formattedSellerAddress}
                                </div>
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    width={200}
                                    height={200}
                                />
                                <div className="font-bold">
                                    {ethers.formatUnits(price, "ether").toString()} Ether
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            {/* <div>{imageURI}</div> */}
        </div>
    )
}
