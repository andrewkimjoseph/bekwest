import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { publicClient } from "@/utils/clients/public";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getTotalAmountOfGrantsGivenToApplicantInWei = async (
  _signerAddress: `0x${string}` | undefined,
  { _applicantWalletAddress }: GetTotalAmountOfGrantsGivenToApplicantInWeiProps
): Promise<number> => {
  let totalAmountOfGrantsGivenToApplicantInWei: number = 0;
  if (window.ethereum) {
    try {
  
      totalAmountOfGrantsGivenToApplicantInWei = Number(
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getTotalAmountOfGrantsGivenToApplicantInWei",
          args: [_applicantWalletAddress],
        })) ?? 0
      );

      return totalAmountOfGrantsGivenToApplicantInWei;
    } catch (error) {
      return totalAmountOfGrantsGivenToApplicantInWei;
    }
  }
  return totalAmountOfGrantsGivenToApplicantInWei;
};

export type GetTotalAmountOfGrantsGivenToApplicantInWeiProps = {
    _applicantWalletAddress: `0x${string}`;
};