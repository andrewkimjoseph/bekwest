import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const checkIfApplicantHasAlreadyMadeAnApplicationToDonation = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _donationId,
    _applicantWalletAddress,
  }: CheckIfApplicantHasAlreadyMadeAnApplicationToDonationProps
): Promise<boolean> => {
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: dango,
        transport: custom(window.ethereum),
      });
      try {
        const applicantHasAlreadyMadeAnApplicationToDonation =
          await publicClient.readContract({
            address: bekwestContractAddress,
            abi: bekwestContractABI,
            functionName: "checkIfApplicantHasAlreadyMadeAnApplicationToDonation",
            args: [_donationId, _applicantWalletAddress],
          });
        return applicantHasAlreadyMadeAnApplicationToDonation as boolean;
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

export type CheckIfApplicantHasAlreadyMadeAnApplicationToDonationProps = {
  _donationId: number;
  _applicantWalletAddress: `0x${string}`;
};
