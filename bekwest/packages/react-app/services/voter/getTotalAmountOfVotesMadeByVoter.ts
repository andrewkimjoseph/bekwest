import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getTotalAmountOfVotesMadeByVoter = async (
  _signerAddress: `0x${string}` | undefined,
  { _voterWalletAddress }: GetTotalAmountOfVotesMadeByVoterProps
): Promise<number> => {
  let totalAmountOfVotesMadeByVoter: number = 0;
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      totalAmountOfVotesMadeByVoter = Number(
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getTotalAmountOfVotesMadeByVoter",
          args: [_voterWalletAddress ],
        })) ?? 0
      );

      return totalAmountOfVotesMadeByVoter;
    } catch (error) {
      return totalAmountOfVotesMadeByVoter;
    }
  }
  return totalAmountOfVotesMadeByVoter;
};

export type GetTotalAmountOfVotesMadeByVoterProps = {
    _voterWalletAddress: `0x${string}`;
};