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

    return (
        <>
            <Head>
                <title>NFT Marketplace </title>
                <meta name="description" content="NFT Marketplace" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto bg-orange-800">
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
                    <div>Web3 Currently Not Enabled..</div>
                )}
            </div>
        </>
    )
}
