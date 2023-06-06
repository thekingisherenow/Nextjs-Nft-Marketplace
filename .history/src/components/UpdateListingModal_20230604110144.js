import { useState } from "react"
import { Input, Modal } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"

export default function UpdateListingModal({ nftAddress, marketplaceAddress, tokenId, isVisible }) {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)

    function updateListing() {}

    const { data } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "observe",
        params: {
            secondsAgos: [0, 10],
        },
    })
    return (
        <div>
            <Modal isVisible={isVisible}>
                <Input
                    label="Update listing price in L1 currency (ETH)"
                    name="new lisiting price"
                    type="number"
                    onChange={(e) => {
                        setPriceToUpdateListingWith(e.target.value)
                        console.log(e.target.value)
                    }}
                />
                {/* so this above is the way to update the price of the listing.
                
                So- what will happen is : we need to call a function from nftMarketplac.
                
                
                */}
            </Modal>
        </div>
    )
}
