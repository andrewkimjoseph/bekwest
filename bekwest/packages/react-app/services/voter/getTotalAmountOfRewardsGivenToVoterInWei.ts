import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getTotalAmountOfRewardsGivenToVoterInWei = async (
  _signerAddress: `0x${string}` | undefined,
  { _voterId, _voterWalletAddress }: GetTotalAmountOfRewardsGivenToVoterInWeiProps
): Promise<number> => {
  let totalAmountOfRewardsGivenToVoterInWei: number = 0;
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      totalAmountOfRewardsGivenToVoterInWei = Number(
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getTotalAmountOfRewardsGivenToVoterInWei",
          args: [_voterId, _voterWalletAddress ],
        })) ?? 0
      );

      return totalAmountOfRewardsGivenToVoterInWei;
    } catch (error) {
      return totalAmountOfRewardsGivenToVoterInWei;
    }
  }
  return totalAmountOfRewardsGivenToVoterInWei;
};

export type GetTotalAmountOfRewardsGivenToVoterInWeiProps = {
    _voterId:number;
    _voterWalletAddress: `0x${string}`;
};