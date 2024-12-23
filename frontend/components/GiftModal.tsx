"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { savePackage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAccount } from "wagmi";

function GiftModal() {
    const [amount, setAmount] = useState<string>("");
    const [shareLink, setShareLink] = useState<string>("");
    const { address } = useAccount();

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setAmount(value)
        }
    }

    const handleSavePackage = async () => {
        const data = await savePackage(address as string);
        setShareLink(data.shareLink);
    }

    return (
        <Card className="relative bg-black bg-opacity-30 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8">
            <CardHeader>
                <div className="flex flex-col items-center">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-md mb-4">
                        <span className="text-white text-2xl font-bold">Logo</span>
                    </div>

                </div>
                <CardTitle className="text-white ">
                    <h2 className="text-xl font-medium">
                        {shareLink
                            ? "Send This To Your Friend To Claim"
                            : "Send Gift To A Friend"}
                    </h2>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {shareLink ? (
                    <div className="flex flex-col items-center text-center">
                        <Input
                            value={shareLink}
                            readOnly
                            className="w-full text-center bg-white/10 text-white border border-white/30 rounded-lg mb-4"
                        />
                        <div className="flex gap-4 justify-center mb-4">
                            <p className="text-white text-lg">Share on</p>
                            <Link
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/instagram.png" // Path to your Instagram logo in the public folder
                                    alt="Share on Instagram"
                                    width={24}
                                    height={24}
                                    className="hover:opacity-80"
                                />
                            </Link>
                            <Link
                                href="https://www.x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/x.png"
                                    alt="Share on X"
                                    width={24}
                                    height={24}
                                    className="hover:opacity-80"
                                />
                            </Link>
                            <Link
                                href="https://www.whatsapp.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/whatsapp.png"
                                    alt="Share on Whatsapp"
                                    width={24}
                                    height={24}
                                    className="hover:opacity-80"
                                />
                            </Link>
                            <Link
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/facebook.png"
                                    alt="Share on Facebook"
                                    width={24}
                                    height={24}
                                    className="hover:opacity-80"
                                />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs">T</div>
                            <Input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                className="bg-transparent border-none text-white p-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg"
                                placeholder="0.00"
                            />
                        </div>
                        <span className="text-white">USDC</span>
                    </div>

                )}
            </CardContent>

            <CardFooter>
                <div className="text-center w-full">
                    {shareLink ? (
                        <p className="text-sm text-gray-300">
                            Need help?{" "}
                            <a href="mailto:bdb.base@base.org" className="underline">
                                bdb.base@base.org
                            </a>
                        </p>
                    ) : (

                        <>
                            <Button className="w-full rounded-full text-white bg-rounded-full bg-[#2455FF] hover:bg-[#2455FF]/80" onClick={async () => await handleSavePackage()}>
                                Send Gift
                            </Button>
                            <Button variant="link" className="text-sm text-gray-300 underline mt-2">
                                Learn More
                            </Button>
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}

export default GiftModal 