import { Inter } from "next/font/google"
import { Form } from "web3uikit"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <main className="">
                <Form
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
