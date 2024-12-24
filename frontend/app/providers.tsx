'use client';
import { ThirdwebProvider } from "thirdweb/react";
import wagmiConfig from '@/lib/config';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: 'auto',
              theme: 'base',
            }
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
      </ThirdwebProvider>
    </WagmiProvider>
  );
}

