import Head from "next/head"
import { Inter } from "next/font/google"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "@/components/NFTBox"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    console.log("data", listedNfts)
    const { isWeb3Enabled } = useMoralis()
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

            <div className="container mx-auto ">
                <h1 className="py-4 px-4 font-bold text-2xl ">Recently Listed:</h1>
                {isWeb3Enabled ? (
                    <div>
                        {fetchingListedNfts ? (
                            <div> Loading ..</div>
                        ) : (
                            <div className="flex flex-wrap  ">
                                {listedNfts.map((nft) => {
                                    const {
                                        price,
                                        marketplaceAddress,
                                        nftAddress,
                                        seller,
                                        tokenId,
                                    } = nft.attributes
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
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}
