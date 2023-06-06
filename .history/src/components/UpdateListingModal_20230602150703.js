import { Input, Modal } from "web3uikit"

export default function updateListingModal({ nftAddress, tokenId, isVisible }) {
    return (
        <div>
            <Modal isVisible={isVisible}>
                <Input label="Update listing price in L1 currency (ETH)"
                name="new lisiting price" 
                type = "number"
                />
            </Modal>
        </div>
    )
}
