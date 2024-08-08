import { Applicant } from "@/entities/applicant";
import { Application } from "@/entities/application";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getAllApplicationsOfDonation = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetAllApplicationsOfDonationProps
): Promise<Application[]> => {
  let allApplicationsOfDonation: Application[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedApplicationsOfDonation = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getAllApplicationsOfDonation",
        args: [_donationId],
      })) as Array<any>;

      for (
        let applicationId = 0;
        applicationId < fetchedApplicationsOfDonation.length;
        applicationId++
      ) {
        const fetchedApplicationOfDonationToBeParsed =
          fetchedApplicationsOfDonation[applicationId];

        const fetchedApplicationOfDonation: Application = {
          id: Number(fetchedApplicationOfDonationToBeParsed["id"]),
          applicantId: Number(fetchedApplicationOfDonationToBeParsed["applicantId"]),
          applicantWalletAddress: fetchedApplicationOfDonationToBeParsed["applicantWalletAddress"],
          donationId: Number(fetchedApplicationOfDonationToBeParsed["donationId"]),
          pitchStatement: fetchedApplicationOfDonationToBeParsed["pitchStatement"],
          isApproved: fetchedApplicationOfDonationToBeParsed["isApproved"],
          isNotBlank: fetchedApplicationOfDonationToBeParsed["isNotBlank"],
        };

        allApplicationsOfDonation.push(fetchedApplicationOfDonation);
      }

      return allApplicationsOfDonation;
    } catch (err) {
      console.info(err);
      return allApplicationsOfDonation;
    }
  }
  return allApplicationsOfDonation;
};

export type GetAllApplicationsOfDonationProps = {
  _donationId: number;
};
