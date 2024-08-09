import { Applicant } from "@/entities/applicant";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const getApplicantOfDonation = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetApplicantOfDonationProps
): Promise<Applicant | null> => {
  let applicant: Applicant | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: dango,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedApplicantOfDonation = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getApplicantOfDonation",
        args: [_donationId],
      })) as any;

      applicant = {
        id: Number(fetchedApplicantOfDonation["id"]),
        walletAddress: fetchedApplicantOfDonation["walletAddress"],
        adjective: fetchedApplicantOfDonation["adjective"],
        gender: fetchedApplicantOfDonation["gender"],
        countryOfResidence: fetchedApplicantOfDonation["countryOfResidence"],
        ageBracket: fetchedApplicantOfDonation["ageBracket"],
        isNotBlank: fetchedApplicantOfDonation["isNotBlank"],
      };

      return applicant;
    } catch (err) {
      console.info(err);
      return applicant;
    }
  }
  return applicant;
};

export type GetApplicantOfDonationProps = {
  _donationId: number;
};
