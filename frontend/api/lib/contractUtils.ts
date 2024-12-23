import {
  Abi,
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem";
import { baseSepolia, base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Convert environment private key to the required hexadecimal format
const privateKey = process.env.PRIVATE_KEY as `0x${string}`;

// Create an account instance from the private key for transaction signing
const account = privateKeyToAccount(privateKey);

// Get network ID from environment variables to determine which chain to use
const networkId = process.env.NETWORK_ID;

// Select the appropriate chain based on network ID
// Use Base mainnet for production, Base Sepolia for testing
const chain = networkId === "mainnet" ? base : baseSepolia;

// Initialize wallet client for writing transactions to the blockchain
// This client handles signed transactions using the provided account
export const writeClient = createWalletClient({
  chain,
  transport: http(), // Use HTTP transport for communication
  account, // Account that will sign transactions
});

// Initialize public client for reading from the blockchain
// This client is used for view functions that don't modify state
export const readClient = createPublicClient({
  chain,
  transport: http(),
});

/**
 * Creates a contract instance for reading data from the blockchain
 * @param address - The deployed contract's address
 * @param abi - The contract's ABI (Application Binary Interface)
 * @returns A contract instance configured for read operations
 */
export function getReadContract(address: `0x${string}`, abi: Abi) {
  return getContract({
    address,
    abi,
    client: readClient,
  });
}

/**
 * Creates a contract instance for writing data to the blockchain
 * @param address - The deployed contract's address
 * @param abi - The contract's ABI (Application Binary Interface)
 * @returns A contract instance configured for write operations
 */
export function getWriteContract(address: `0x${string}`, abi: Abi) {
  return getContract({
    address,
    abi,
    client: writeClient,
  });
}
