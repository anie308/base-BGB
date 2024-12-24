"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownBasename,
  WalletDropdownFundLink,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { defineChain } from "thirdweb/chains";
import {
  useAccount,
  useDisconnect,
  useWalletClient,
  useSwitchChain,
} from "wagmi";
import Image from "next/image";
import { useEffect } from "react";
import { CLIENT } from "@/constants";
import { ConnectButton, useSetActiveWallet } from "thirdweb/react";
import { viemAdapter } from "thirdweb/adapters/viem";
import { createWalletAdapter } from "thirdweb/wallets";

function Navigation() {
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const setActiveWallet = useSetActiveWallet();

  useEffect(() => {
    const setActive = async () => {
      if (walletClient) {
        // adapt the walletClient to a thirdweb account
        const adaptedAccount = viemAdapter.walletClient.fromViem({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          walletClient: walletClient as any, // accounts for wagmi/viem version mismatches
        });
        // create the thirdweb wallet with the adapted account
        const thirdwebWallet = createWalletAdapter({
          client: CLIENT,
          adaptedAccount,
          chain: defineChain(await walletClient.getChainId()),
          onDisconnect: async () => {
            await disconnectAsync();
          },
          switchChain: async (chain) => {
            await switchChainAsync({ chainId: chain.id as 8453 });
          },
        });
        void setActiveWallet(thirdwebWallet);
      }
    };
    void setActive();
  }, [disconnectAsync, setActiveWallet, switchChainAsync, walletClient]);

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
      {isConnected ? (
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
              <WalletDropdownBasename />
              <WalletDropdownFundLink />
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      ) : (
        <ConnectButton client={CLIENT} theme="light" />
      )}
    </nav>
  );
}

export default Navigation;
