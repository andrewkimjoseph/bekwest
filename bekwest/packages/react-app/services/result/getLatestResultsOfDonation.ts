import { Result } from "@/entities/result";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getLatestResultsOfDonation = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetLatestResultsOfDonationProps
): Promise<Result[]> => {
  let latestResultsOfDonation: Result[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedLatestResultsOfDonation = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getLatestResultsOfDonation",
        args: [_donationId],
      })) as Array<any>;

      for (
        let resultId = 0;
        resultId < fetchedLatestResultsOfDonation.length;
        resultId++
      ) {
        const fetchedLatestResultOfDonationToBeParsed =
          fetchedLatestResultsOfDonation[resultId];

        const fetchedLatestResultOfDonation: Result = {
          id: Number(fetchedLatestResultOfDonationToBeParsed["id"]),
          donationId: Number(
            fetchedLatestResultOfDonationToBeParsed["donationId"]
          ),

          applicantId: Number(
            fetchedLatestResultOfDonationToBeParsed["applicantId"]
          ),

          applicantWalletAddress:
            fetchedLatestResultOfDonationToBeParsed["applicantWalletAddress"],

          voteCount: Number(
            fetchedLatestResultOfDonationToBeParsed["voteCount"]
          ),

          isNotBlank: fetchedLatestResultOfDonationToBeParsed["isNotBlank"],
        };

        latestResultsOfDonation.push(fetchedLatestResultOfDonation);
      }

      return latestResultsOfDonation;
    } catch (err) {
      console.info(err);
      return latestResultsOfDonation;
    }
  }
  return latestResultsOfDonation;
};

export type GetLatestResultsOfDonationProps = {
  _donationId: number;
};
