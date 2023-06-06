import { ethers } from "ethers"
import { Inter } from "next/font/google"
import { Form } from "web3uikit"
const inter = Inter({ subsets: ["latin"] })
import nftAbi from "../../constants/basicNftAbi.json"
import nftAddresses from "../../constants/networkMapping.json"
import { useMoralis } from "react-moralis"

export default function Home() {
    const { chainId } = useMoralis()
    //
    async function approveAndList(data) {
        console.log("Approving..")

        console.log("nftAddresses from the networkMapping", nftAddresses)
        //we need chainId now
        const chainId = chainId ? parseInt(chainId).toString() : "11155111"
        console.log("chainId", chainId)
        // const marketplaceAddress =
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const price = ethers.parseEther(data.data[2].inputResult).toString()

        // const approveOptions = {
        //     abi: nftAbi, //basic nft ko abi
        //     contractAddress: nftAddress,
        //     functionName: "approve",
        //     params: {
        //         to: marketplaceAddress,
        //         tokenId: tokenId,
        //     },
        // }
    }
    return (
        <>
            <main className="">
                <Form
                    onSubmit={approveAndList}
                    data={[
                        {
                            name: "NFT Address",
                            type: "text",
                            inputWidth: "50%",
                            value: "",
                            key: "nftAddress",
                        },
                        {
                            name: "Token Id",
                            key: "tokenId",
                            type: "number",
                            value: "",
                            inputWidth: "50%",
                        },
                        {
                            name: "Price (in ETH)",
                            key: "price",
                            type: "number",
                            value: "",
                            inputWidth: "50%",
                        },
                    ]}
                    title="Sell your NFT !"
                    id="Main Form"
                ></Form>
            </main>
        </>
    )
}
