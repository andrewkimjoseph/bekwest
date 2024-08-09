import { Donation } from "@/entities/donation";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const getAllDonationsCreatedByDonor = async (
  _signerAddress: `0x${string}` | undefined,
  { _donorWalletAddress }: GetAllDonationsCreatedByDonorProps
): Promise<Donation[]> => {
  let allDonationsCreatedByDonor: Donation[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: dango,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedDonationsCreatedByDonor = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getAllDonationsCreatedByDonor",
        args: [_donorWalletAddress],
      })) as Array<any>;

      for (
        let donationId = 0;
        donationId < fetchedDonationsCreatedByDonor.length;
        donationId++
      ) {
        const fetchedDonationCreatedByDonorToBeParsed =
          fetchedDonationsCreatedByDonor[donationId];

        const fetchedDonationCreatedByDonor: Donation = {
          id: Number(fetchedDonationCreatedByDonorToBeParsed["id"]),
          donorId: Number(fetchedDonationCreatedByDonorToBeParsed["donorId"]),
          donorWalletAddress:
            fetchedDonationCreatedByDonorToBeParsed["donorWalletAddress"],
          topic: fetchedDonationCreatedByDonorToBeParsed["topic"],
          industry: fetchedDonationCreatedByDonorToBeParsed["industry"],
          maxNumberOfApplications: Number(
            fetchedDonationCreatedByDonorToBeParsed["maxNumberOfApplications"]
          ),
          maxNumberOfVotes: Number(
            fetchedDonationCreatedByDonorToBeParsed["maxNumberOfVotes"]
          ),
          amountDonatedInWei: Number(
            fetchedDonationCreatedByDonorToBeParsed["amountDonatedInWei"]
          ),
          applicationIsClosed:
            fetchedDonationCreatedByDonorToBeParsed["applicationIsClosed"],
          votingIsClosed:
            fetchedDonationCreatedByDonorToBeParsed["votingIsClosed"],
          isNotBlank: fetchedDonationCreatedByDonorToBeParsed["isNotBlank"],
        };

        allDonationsCreatedByDonor.push(fetchedDonationCreatedByDonor);
      }

      return allDonationsCreatedByDonor;
    } catch (err) {
      console.info(err);
      return allDonationsCreatedByDonor;
    }
  }
  return allDonationsCreatedByDonor;
};

export type GetAllDonationsCreatedByDonorProps = {
  _donorWalletAddress: `0x${string}`;
};
