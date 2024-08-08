import { Donation } from "@/entities/donation";
import { Vote } from "@/entities/vote";
import { Voter } from "@/entities/voter";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getAllVotesOfVoter = async (
  _signerAddress: `0x${string}` | undefined,
  { _voterWalletAdddres }: GetAllVotesOfVoterProps
): Promise<Vote[]> => {
  let allVotesOfVoter: Vote[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedVotesMadeByVoter = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getAllVotesOfVoter",
        args: [_voterWalletAdddres],
      })) as Array<any>;

      for (
        let donationId = 0;
        donationId < fetchedVotesMadeByVoter.length;
        donationId++
      ) {
        const fetchedVoteToBeParsed =
          fetchedVotesMadeByVoter[donationId];

        const fetchedVote: Vote = {
          id: Number(fetchedVoteToBeParsed["id"]),
          voterId: Number(fetchedVoteToBeParsed["voterId"]),
          applicantId:
          Number(fetchedVoteToBeParsed["applicantId"]),
          donationId:
          Number(fetchedVoteToBeParsed["donationId"]),

          isRewarded: fetchedVoteToBeParsed["isRewarded"],

          isNotBlank: fetchedVoteToBeParsed["isNotBlank"],
        };

        allVotesOfVoter.push(fetchedVote);
      }

      return allVotesOfVoter;
    } catch (err) {
      console.info(err);
      return allVotesOfVoter;
    }
  }
  return allVotesOfVoter;
};

export type GetAllVotesOfVoterProps = {
  _voterWalletAdddres: `0x${string}`;
};
