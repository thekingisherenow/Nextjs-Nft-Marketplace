const Moralis = require("moralis")
const { EvmChain } = require("@moralisweb3/common-evm-utils")

require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")
let chainId = process.env.chainId || "31337"

const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

async function main() {
    console.log("process.env.webhookUrl", process.env.webhookUrl)

    // Moralis.start({
    //     apiKey: "YOUR_API_KEY",
    // })
    /*
    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );
    */

    const itemListedOptions = {
        chains: [EvmChain.SEPOLIA], // list of blockchains to monitor
        description: "nftMarketplace", // your description
        tag: "nftMarketplace", // give it a tag
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
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
            ],
            name: "ItemListed",
            type: "event",
        },
        includeContractLogs: true,
        topic0: ["ItemListed(address,address,uint256,uint256)"],
        webhookUrl: process.env.webhookUrl, // webhook url to receive events,
    }

    const newStream = await Moralis.Streams.add(itemListedOptions)
    const { id } = newStream.toJSON() // { id: 'YOUR_STREAM_ID', ...newStream }

    // Now we attach bobs address to the stream
    const address = contractAddress

    await Moralis.Streams.addAddress({ address, id })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
