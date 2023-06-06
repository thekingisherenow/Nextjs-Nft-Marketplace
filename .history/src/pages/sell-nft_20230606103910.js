import { ethers } from "ethers"
import { Inter } from "next/font/google"
import { Form, useNotification } from "web3uikit"
const inter = Inter({ subsets: ["latin"] })
import nftAbi from "../../constants/basicNftAbi.json"
import nftMarketplaceAbi from "../../constants/nftMarketplaceAbi.json"

import nftAddresses from "../../constants/networkMapping.json"
import { useMoralis, useWeb3Contract } from "react-moralis"

export default function Home() {
    const { chainId } = useMoralis()

    const { runContractFunction } = useWeb3Contract()
    const dispatch = useNotification()

    async function approveAndList(data) {
        console.log("Approving..")

        const chainString = chainId ? parseInt(chainId).toString() : "11155111"
        const marketplaceAddress = nftAddresses[chainString]["NftMarketplace"]
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const price = ethers.parseEther(data.data[2].inputResult).toString()

        const approveOptions = {
            abi: nftAbi, //basic nft ko abi
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price, marketplaceAddress),
            onError: (error) => console.log(error),
        })
    }
    async function handleApproveSuccess(nftAddress, tokenId, price, marketplaceAddress) {
        dispatch({
            type: "success",
            message: "Approved Successfully",
            title: " Listing started.Please hold tight",
            position: "topR",
        })

        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess,
            onError: (error) => console.log(error),
        })
    }

    const handleListSuccess = async (tx) => {
        dispatch({
            type: "success",
            message: "Just about there",
            title: " Lets wait for one block to finish",
            position: "topR",
        })
        //notification here.
        await tx.wait(1)
        dispatch({
            type: "success",
            message: " Succesfully listed",
            title: " Listing updated.please refresh and (move blocks)",
            position: "topR",
        })
    }
    return (
        <>
            <main className="mx-auto  flex  justify-center mt-10 items-center">
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
