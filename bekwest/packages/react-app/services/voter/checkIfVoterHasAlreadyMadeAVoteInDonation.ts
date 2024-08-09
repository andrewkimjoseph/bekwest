import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const checkIfVoterHasAlreadyMadeAVoteInDonation = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _donationId,
    _voterWalletAddress,
  }: CheckIfVoterHasAlreadyMadeAVoteInDonationProps
): Promise<boolean> => {
  if (window.ethereum) {
    try {
      const publicClient = createPublicClient({
        chain: dango,
        transport: custom(window.ethereum),
      });
      try {
        const voterHasAlreadyMadeAVoteInDonation =
          await publicClient.readContract({
            address: bekwestContractAddress,
            abi: bekwestContractABI,
            functionName: "checkIfVoterHasAlreadyMadeAVoteInDonation",
            args: [_donationId, _voterWalletAddress],
          });
        return voterHasAlreadyMadeAVoteInDonation as boolean;
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

export type CheckIfVoterHasAlreadyMadeAVoteInDonationProps = {
  _donationId: number;
  _voterWalletAddress: `0x${string}`;
};
