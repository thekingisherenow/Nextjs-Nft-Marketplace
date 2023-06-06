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
    1. add stream. 
    */

    const options = {
        chains: [EvmChain.ETHEREUM, EvmChain.POLYGON], // list of blockchains to monitor
        description: "monitor Bobs wallet", // your description
        tag: "bob", // give it a tag
        webhookUrl: "https://YOUR_WEBHOOK_URL", // webhook url to receive events,
        includeNativeTxs: true,
    }

    const newStream = await Moralis.Streams.add(options)
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
