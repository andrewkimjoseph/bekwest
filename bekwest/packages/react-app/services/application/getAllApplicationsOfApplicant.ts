import { Applicant } from "@/entities/applicant";
import { Application } from "@/entities/application";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { publicClient } from "@/utils/clients/public";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getApplicationsOfApplicant = async (
  _signerAddress: `0x${string}` | undefined,
  { _applicantWalletAddress }: GetAllApplicationsOfApplicantProps
): Promise<Application[]> => {
  let allApplicationsOfApplicant: Application[] = [];
  if (window.ethereum) {
    try {
      const fetchedApplicationsOfApplicant = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getApplicationsOfApplicant",
        args: [_applicantWalletAddress],
      })) as Array<any>;

      for (
        let applicationId = 0;
        applicationId < fetchedApplicationsOfApplicant.length;
        applicationId++
      ) {
        const fetchedApplicationOfApplicantToBeParsed =
          fetchedApplicationsOfApplicant[applicationId];

        const fetchedApplicationOfDonation: Application = {
          id: Number(fetchedApplicationOfApplicantToBeParsed["id"]),
          applicantId: Number(fetchedApplicationOfApplicantToBeParsed["applicantId"]),
          applicantWalletAddress: fetchedApplicationOfApplicantToBeParsed["applicantWalletAddress"],
          donationId: Number(fetchedApplicationOfApplicantToBeParsed["donationId"]),
          pitchStatement: fetchedApplicationOfApplicantToBeParsed["pitchStatement"],
          isApproved: fetchedApplicationOfApplicantToBeParsed["isApproved"],
          isNotBlank: fetchedApplicationOfApplicantToBeParsed["isNotBlank"],
        };

        allApplicationsOfApplicant.push(fetchedApplicationOfDonation);
      }

      return allApplicationsOfApplicant;
    } catch (err) {
      console.info(err);
      return allApplicationsOfApplicant;
    }
  }
  return allApplicationsOfApplicant;
};

export type GetAllApplicationsOfApplicantProps = {
  _applicantWalletAddress: `0x${string}`;
};
