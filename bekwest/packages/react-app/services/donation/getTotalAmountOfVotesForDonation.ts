import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getTotalAmountOfVotesForDonation = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetTotalAmountOfVotesForDonation
): Promise<number> => {
  let totalAmountOfVotesForDonation: number = 0;
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum),
      });
      totalAmountOfVotesForDonation = Number(
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getTotalAmountOfVotesForDonation",
          args: [_donationId],
        })) ?? 0
      );

      return totalAmountOfVotesForDonation;
    } catch (error) {
      return totalAmountOfVotesForDonation;
    }
  }
  return totalAmountOfVotesForDonation;
};

export type GetTotalAmountOfVotesForDonation = {
    _donationId:number;
};