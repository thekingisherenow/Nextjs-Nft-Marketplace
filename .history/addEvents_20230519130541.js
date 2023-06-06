const Moralis = require("moralis/node")
require("dotenv").config()

const contractAddresses = require("./constants/networkMapping.json")

let chainId = process.env.chainId || "31337"

const contractAddress = contractAddresses[chainId]["NftMarketplace"]
