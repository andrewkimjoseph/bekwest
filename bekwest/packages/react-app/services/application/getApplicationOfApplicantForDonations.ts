import { Applicant } from "@/entities/applicant";
import { Application } from "@/entities/application";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getApplicationOfApplicantForDonation = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _donationId,
    _applicationId,
    _applicantWalletAddress,
  }: GetApplicationOfApplicantForDonationProps
): Promise<Application | null> => {
  let application: Application | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedApplicationOfApplicantForDonation =
        (await publicClient.readContract({
          address: bekwestContractAddress,
          abi: bekwestContractABI,
          functionName: "getApplicationOfApplicantForDonation",
          args: [_donationId, _applicationId, _applicantWalletAddress],
        })) as any;

      application = {
        id: Number(fetchedApplicationOfApplicantForDonation["id"]),
        applicantId: Number(
          fetchedApplicationOfApplicantForDonation["applicantId"]
        ),
        applicantWalletAddress:
          fetchedApplicationOfApplicantForDonation["applicantWalletAddress"],
        donationId: Number(
          fetchedApplicationOfApplicantForDonation["donationId"]
        ),
        pitchStatement:
          fetchedApplicationOfApplicantForDonation["pitchStatement"],
        isApproved: fetchedApplicationOfApplicantForDonation["isApproved"],
        isNotBlank: fetchedApplicationOfApplicantForDonation["isNotBlank"],
      };

      return application;
    } catch (err) {
      console.info(err);
      return application;
    }
  }
  return application;
};

export type GetApplicationOfApplicantForDonationProps = {
  _donationId: number;
  _applicationId: number;
  _applicantWalletAddress: `0x${string}`;
};
