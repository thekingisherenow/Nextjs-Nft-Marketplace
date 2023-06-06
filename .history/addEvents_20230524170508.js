import Moralis from "moralis"
import { EvmChain } from "@moralisweb3/evm-utils"

require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")
let chainId = process.env.chainId || "31337"
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

Moralis.start({
    apiKey: "YOUR_API_KEY",
})

async function main() {
   
    /*
    */

    const itemListedOptions = {
        chains: [EvmChain.SEPOLIA], // list of blockchains to monitor
        description: "nftMarketplace", // your description
        tag: "nftMarketplace", // give it a tag
        abi : ,
        includeContractLogs:true,
        topic0: 
        webhookUrl: "https://47dd-27-34-25-142.in.ngrok.io/streams", // webhook url to receive events,
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
