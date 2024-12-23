import { Abi } from "viem";
import { getReadContract, getWriteContract } from "./contractUtils";
import bgbContractAbi from "../abi/bgbContractAbi.json";
const contractAddress = process.env.CONTRACT_ADDRESS as `0x${string}`;

export class BGBContract {
  contractAddress: `0x${string}`;
  readClient: any;
  writeClient: any;

  constructor() {
    this.contractAddress = contractAddress;
    this.readClient = getReadContract(
      this.contractAddress,
      bgbContractAbi.abi as Abi
    );
    this.writeClient = getWriteContract(
      this.contractAddress,
      bgbContractAbi.abi as Abi
    );
  }

  claim(accountId: string) {
    const args: string[] = [accountId];
    return this.writeClient.write.claim(args);
  }
}
