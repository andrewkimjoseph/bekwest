import { Donation } from "@/entities/donation";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getAllDonations = async (
  _signerAddress: `0x${string}` | undefined,
): Promise<Donation[]> => {
  let allDonations: Donation[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedDonations = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getAllDonations",
      })) as Array<any>;

      for (
        let donationId = 0;
        donationId < fetchedDonations.length;
        donationId++
      ) {
        const fetchedDonationToBeParsed =
          fetchedDonations[donationId];

        const fetchedDonationCreatedByDonor: Donation = {
          id: Number(fetchedDonationToBeParsed["id"]),
          donorId: Number(fetchedDonationToBeParsed["donorId"]),
          donorWalletAddress:
            fetchedDonationToBeParsed["donorWalletAddress"],
          topic: fetchedDonationToBeParsed["topic"],
          industry: fetchedDonationToBeParsed["industry"],
          maxNumberOfApplications: Number(
            fetchedDonationToBeParsed["maxNumberOfApplications"]
          ),
          maxNumberOfVotes: Number(
            fetchedDonationToBeParsed["maxNumberOfVotes"]
          ),
          amountDonatedInWei: Number(
            fetchedDonationToBeParsed["amountDonatedInWei"]
          ),
          applicationIsClosed:
            fetchedDonationToBeParsed["applicationIsClosed"],
          votingIsClosed:
            fetchedDonationToBeParsed["votingIsClosed"],
          isNotBlank: fetchedDonationToBeParsed["isNotBlank"],
        };

        allDonations.push(fetchedDonationCreatedByDonor);
      }

      return allDonations;
    } catch (err) {
      console.info(err);
      return allDonations;
    }
  }
  return allDonations;
};
