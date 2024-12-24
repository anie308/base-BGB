import { WAGMI_CHAIN } from '@/constants';
import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
// import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

const wagmiConfig = createConfig({
    chains: [WAGMI_CHAIN],
    connectors: [
        coinbaseWallet({
            appName: 'OnchainKit',
            preference: 'smartWalletOnly',
            version: '4',
        }),
    ],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
      }),
    // transports: {
    //     [WAGMI_CHAIN.id]: http(),
    // },
    transports: {
        [WAGMI_CHAIN.id]: http(`https://${WAGMI_CHAIN.id}.rpc.thirdweb.com/${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}`),
      },
});

export default wagmiConfig;

