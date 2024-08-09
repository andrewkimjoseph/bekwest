import { Vote } from "@/entities/vote";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const getAllVotesOfVoter = async (
  _signerAddress: `0x${string}` | undefined,
  { _voterWalletAdddres }: GetAllVotesOfVoterProps
): Promise<Vote[]> => {
  let allVotesOfVoter: Vote[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: dango,
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
        let voterId = 0;
        voterId < fetchedVotesMadeByVoter.length;
        voterId++
      ) {
        const fetchedVoteToBeParsed =
          fetchedVotesMadeByVoter[voterId];

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
