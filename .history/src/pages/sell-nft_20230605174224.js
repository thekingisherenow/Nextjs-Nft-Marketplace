import { Inter } from "next/font/google"
import { Form } from "web3uikit"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <main className="">
                <h1>Sell Page.</h1>

                <Form
                    data={[
                        {
                            key: "NFT_Address",
                            name: "Email",
                            type: "text",
                            inputWidth: "50%",
                            value: "",
                        },
                        //   {
                        //     key: 'NFT_Address',
                        //     name: 'Email',
                        //     type: 'text',

                        //   },
                    ]}
                ></Form>
            </main>
        </>
    )
}
