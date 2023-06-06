import { useMoralis } from "react-moralis"
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")
let chainId = process.env.chainId || "31337"
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

async function main() {
    //what we need to do is change the data base ..and this main() way is done in the backend..we arent working in backends now,
    //we are working in the front end part now..
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
