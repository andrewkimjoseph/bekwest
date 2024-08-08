import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getPotentialAmountOfGrantOfDonationInWei = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetPotentialAmountOfGrantOfDonationInWeiProps
): Promise<number> => {
  let potentialAmountOfGrantOfDonationInWei: number = 0;
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      potentialAmountOfGrantOfDonationInWei = Number(
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getPotentialAmountOfGrantOfDonationInWei",
          args: [_donationId],
        })) ?? 0
      );

      return potentialAmountOfGrantOfDonationInWei;
    } catch (error) {
      return potentialAmountOfGrantOfDonationInWei;
    }
  }
  return potentialAmountOfGrantOfDonationInWei;
};

export type GetPotentialAmountOfGrantOfDonationInWeiProps = {
    _donationId:number;
};