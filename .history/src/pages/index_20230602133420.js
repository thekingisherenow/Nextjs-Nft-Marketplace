import Head from "next/head"
import { Inter } from "next/font/google"
import { useMoralisQuery } from "react-moralis"
import NFTBox from "@/components/NFTBox"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    console.log("data", listedNfts)
    // let's map listedNfts

    return (
        <>
            <Head>
                <title>NFT Marketplace </title>
                <meta name="description" content="NFT Marketplace" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* How do we show the recently listed NFTS ?? */}
            {/* -> We will index the events off-chain and then read from database.. 
            //set up a server to listen those events to be fired.,and we will add them to the database to query. */}

            <main className="text-blue-500 text-xl">
                <div className="container mx-auto flex ">
                    {listedNfts.map((nft) => {
                        const { price, marketplaceAddress, nftAddress, seller, tokenId } =
                            nft.attributes
                        return (
                            <div>
                                <NFTBox
                                    tokenId={tokenId}
                                    nftAddress={nftAddress}
                                    price={price}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                />
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}
