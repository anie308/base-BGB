import { createThirdwebClient, defineChain } from "thirdweb";
import { base } from "wagmi/chains";

export const APP_NAME = "Onchain Gifting";

export const GIFT_PACK_ADDRESS = "0x1b6E902360035aC523e27d8FE69140A271aB9e7c";

export const WAGMI_CHAIN = base;
export const CHAIN = defineChain({
  id: base.id,
  name: base.name,
  rpcUrls: {
    default: {
      http: [`https://${WAGMI_CHAIN.id}.rpc.thirdweb.com/${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}`],
    },
  },
  nativeCurrency: base.nativeCurrency,
  blockExplorers: {
    default: {
      name: base.blockExplorers.default.name,
      url: base.blockExplorers.default.url,
    },
  },
});

export const CLIENT = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

export const UNKNOWN_TOKEN_IMAGE = 'https://static.coingecko.com/s/missing_thumb_2x-38c6e63b2e37f3b16510adf55368db6d8d8e6385629f6e9d41557762b25a6eeb.png';
