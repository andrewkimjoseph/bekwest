import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getPotentialAmountOfRewardOfDonationInWei = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetPotentialAmountOfRewardOfDonationInWeiProps
): Promise<number> => {
  let potentialAmountOfRewardOfDonationInWei: number = 0;
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      potentialAmountOfRewardOfDonationInWei = Number(
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getPotentialAmountOfRewardOfDonationInWei",
          args: [_donationId],
        })) ?? 0
      );

      return potentialAmountOfRewardOfDonationInWei;
    } catch (error) {
      return potentialAmountOfRewardOfDonationInWei;
    }
  }
  return potentialAmountOfRewardOfDonationInWei;
};

export type GetPotentialAmountOfRewardOfDonationInWeiProps = {
    _donationId:number;
};