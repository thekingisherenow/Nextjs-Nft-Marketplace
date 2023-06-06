import { ethers } from "ethers"
import { Inter } from "next/font/google"
import { Form } from "web3uikit"
const inter = Inter({ subsets: ["latin"] })
import { nftAbi } from "../../constants/basicNftAbi.json"

export default function Home() {
    //
    async function approveAndList(data) {
        console.log("Approving..")
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const price = ethers.parseEther(data.data[2].inputResult).toString()

        const approveOptions = {
            abi: nft, //basic nft ko abi
        }
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
