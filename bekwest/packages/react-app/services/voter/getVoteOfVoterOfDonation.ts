import { Vote } from "@/entities/vote";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getVoteOfVoterForDonation = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId, _voterWalletAddress}: GetVoteOfVoterForDonationProps
): Promise<Vote | null> => {
  let vote: Vote | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedVoteOfVoterForDonation = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getVoteOfVoterForDonation",
        args: [_donationId, _voterWalletAddress],
      })) as any;

      vote = {
        id: Number(fetchedVoteOfVoterForDonation["id"]),
        voterId: Number(fetchedVoteOfVoterForDonation["voterId"]),
        applicantId: Number(fetchedVoteOfVoterForDonation["applicantId"]),
        donationId: Number(fetchedVoteOfVoterForDonation["donationId"]),
        isRewarded: fetchedVoteOfVoterForDonation["isRewarded"],
        isNotBlank: fetchedVoteOfVoterForDonation["isNotBlank"],
      };

      return vote;
    } catch (err) {
      console.info(err);
      return vote;
    }
  }
  return vote;
};

export type GetVoteOfVoterForDonationProps = {
  _donationId: number;
  _voterWalletAddress: `0x${string}`;
};
