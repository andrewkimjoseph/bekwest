import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { dango } from "@/utils/dangoChain";
import { createPublicClient, custom } from "viem";


export const checkIfApplicantExists = async (
  _signerAddress: `0x${string}` | undefined
): Promise<boolean> => {
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: dango,
        transport: custom(window.ethereum),
      });
      try {
        const applicantExists = await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "checkIfApplicantExists",
          args: [_signerAddress],
        });
        return applicantExists as boolean;
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