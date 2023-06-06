import Header from "@/components/Header"
import "@/styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
    console.log(`Look here: ${process.env.appId}`)
    console.log(`Look here: ${process.env.serverUrl}`)
    return (
        <>
            <Head>
                <title>NFT Marketplace </title>
                <meta name="description" content="NFT Marketplace" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MoralisProvider appId={process.env.appId ?? ""} serverUrl={process.env.serverUrl ? ""}>
                <Header />
                <Component {...pageProps} />
            </MoralisProvider>
        </>
    )
}
