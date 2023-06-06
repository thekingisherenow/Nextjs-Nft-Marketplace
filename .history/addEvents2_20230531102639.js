const Moralis = require("moralis").default
const { EvmChain } = require("@moralisweb3/common-evm-utils")

require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")
console.log("contractAddresses: ", contractAddresses)
let chainId = process.env.chainId || "11155111"
console.log("chainId: ", chainId)
const contractAddress = contractAddresses[chainId]["NftMarketplace"]
console.log("contractAddress: ", contractAddress)

async function main() {
    console.log("process.env.webhookUrl", process.env.webhookUrl)
    console.log("process.env.MORALIS_API_KEY", process.env.MORALIS_API_KEY)

    Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
    })
    console.log("Moralis started")

    const itemCancelledOptions = {
        chains: [EvmChain.SEPOLIA], // list of blockchains to monitor
        description: "Item Cancelled listings", // your description
        tag: "ItemCancelled", // give it a tag
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "seller",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
            ],
            name: "ItemCancelled",
            type: "event",
        },
        includeContractLogs: true,
        topic0: ["ItemCancelled(address,address,uint256)"],
        webhookUrl: process.env.webhookUrl, // webhook url to receive events,
    }
    const newStream = await Moralis.Streams.add(itemCancelledOptions)
    const id = newStream.toJSON().id
    // { id: 'YOUR_STREAM_ID', ...newStream }

    //  Now we attach address to the stream
    const result3 = await Moralis.Streams.addAddress({ address, id })
    console.log(`ItemCancelled Steam created with streamId ${id} & contract Address  ${address} `)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
