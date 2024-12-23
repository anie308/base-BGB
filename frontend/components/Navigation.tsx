"use client";
import { Address, Avatar, EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';

import Image from 'next/image';

function Navigation() {
    return (
        <nav className="flex justify-between items-center p-4">
            {/* Left side - Logo */}
            <div className="flex items-center">
                <Image
                    src="/base_xmas.svg"
                    alt="Base Christmas Logo"
                    width={40}
                    height={40}
                />
            </div>

            {/* Right side - Wallet Connect and Identity */}
            <div className="flex items-center gap-4">
                <Wallet>
                    <ConnectWallet className="rounded-full">
                        <Avatar className="h-6 w-6" />
                        <Name />
                    </ConnectWallet>
                    <WalletDropdown>
                        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                            <Avatar />
                            <Name />
                            <Address />
                            <EthBalance />
                        </Identity>
                        <WalletDropdownDisconnect />
                    </WalletDropdown>
                </Wallet>

            </div>
        </nav>
    )
}

export default Navigation