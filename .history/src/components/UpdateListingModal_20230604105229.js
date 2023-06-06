import { Input, Modal } from "web3uikit"

export default function UpdateListingModal({ nftAddress, tokenId, isVisible }) {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState()

    return (
        <div>
            <Modal isVisible={isVisible}>
                <Input
                    label="Update listing price in L1 currency (ETH)"
                    name="new lisiting price"
                    type="number"
                    onChange={(e) => {}}
                />
            </Modal>
        </div>
    )
}
