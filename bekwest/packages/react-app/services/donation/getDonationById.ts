import { Donation } from "@/entities/donation";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getDonationById = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetDonationByIdProps
): Promise<Donation | null> => {
  let donation: Donation | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedDonation = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getDonorByWalletAddress",
        args: [_donationId],
      })) as any;

      donation = {
        id: Number(fetchedDonation["id"]),
        donorId: Number(fetchedDonation["donorId"]),
        donorWalletAddress: fetchedDonation["donorWalletAddress"],
        topic: fetchedDonation["topic"],
        industry: fetchedDonation["industry"],
        maxNumberOfApplications: Number(
          fetchedDonation["maxNumberOfApplications"]
        ),
        maxNumberOfVotes: Number(fetchedDonation["maxNumberOfVotes"]),
        amountDonatedInWei: Number(fetchedDonation["amountDonatedInWei"]),
        applicationIsClosed: fetchedDonation["applicationIsClosed"],
        votingIsClosed: fetchedDonation["votingIsClosed"],
        isNotBlank: fetchedDonation["isNotBlank"],
      };

      return donation;
    } catch (err) {
      console.info(err);
      return donation;
    }
  }
  return donation;
};

export type GetDonationByIdProps = {
  _donationId: number;
};
