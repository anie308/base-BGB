import {
  Abi,
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem";
import { baseSepolia, base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
const account = privateKeyToAccount(privateKey);
const networkId = process.env.NETWORK_ID;
const chain = networkId === "mainnet" ? base : baseSepolia;
export const writeClient = createWalletClient({
  chain,
  transport: http(),
  account,
});
export const readClient = createPublicClient({
  chain,
  transport: http(),
});
export function getReadContract(address: `0x${string}`, abi: Abi) {
  return getContract({
    address,
    abi,
    client: readClient,
  });
}

export function getWriteContract(address: `0x${string}`, abi: Abi) {
  return getContract({
    address,
    abi,
    client: writeClient,
  });
}
