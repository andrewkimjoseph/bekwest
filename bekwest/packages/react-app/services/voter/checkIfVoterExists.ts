import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";


export const checkIfVoterExists = async (
  _signerAddress: `0x${string}` | undefined
): Promise<boolean> => {
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      try {
        const voterExists = await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "checkIfVoterExists",
          args: [_signerAddress],
        });
        return voterExists as boolean;
      } catch (err) {
        console.error(err);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
};