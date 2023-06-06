import Header from "@/components/Header"
import "@/styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URl = process.env.NEXT_PUBLIC_SERVER_URL

export default function App({ Component, pageProps }) {
    console.log(`Look here: ${process.env.NEXT_PUBLIC_APP_ID}`)
    console.log(`Look here: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    return (
        <>
            <Head>
                <title>NFT Marketplace </title>
                <meta name="description" content="NFT Marketplace" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MoralisProvider appId={APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
                <Header />
                <Component {...pageProps} />
            </MoralisProvider>
        </>
    )
}
