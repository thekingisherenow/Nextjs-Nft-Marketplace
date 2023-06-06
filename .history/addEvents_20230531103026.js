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

    const itemListedOptions = {
        chains: [EvmChain.SEPOLIA], // list of blockchains to monitor
        description: "Item Listed", // your description
        tag: "Item Listed", // give it a tag
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

    let newStream = await Moralis.Streams.add(itemListedOptions)
    let id = newStream.toJSON().id
    const address = contractAddress
    // Now we attach address to the stream
    const result = await Moralis.Streams.addAddress({ address, id })
    console.log(`ItemListed Steam created with streamId ${id} & contract Address  ${address} `)
    setTimeout(() => {}, 10000)

    const itemBoughtOptions = {
        chains: [EvmChain.SEPOLIA], // list of blockchains to monitor
        description: "Item Bought listings", // your description
        tag: "ItemBought", // give it a tag
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "buyer",
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
            name: "ItemBought",
            type: "event",
        },
        includeContractLogs: true,
        topic0: ["ItemBought(address,address,uint256,uint256)"],
        webhookUrl: process.env.webhookUrl, // webhook url to receive events,
    }
    newStream = await Moralis.Streams.add(itemListedOptions)
    console.log(newStream.toJSON())
    id = newStream.toJSON().id
    // { id: 'YOUR_STREAM_ID', ...newStream }
    // Now we attach address to the stream
    const result2 = await Moralis.Streams.addAddress({ address, id })
    console.log(`ItemBought Steam created with streamId ${id} & contract Address  ${address} `)

    setTimeout(() => {}, 10000)
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
    newStream = await Moralis.Streams.add(itemCancelledOptions)
    id = newStream.toJSON().id
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
