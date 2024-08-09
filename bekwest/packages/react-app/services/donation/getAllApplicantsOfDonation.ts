import { Applicant } from "@/entities/applicant";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const getAllApplicantsOfDonation = async (
  _signerAddress: `0x${string}` | undefined,
  { _donationId }: GetAllApplicantsOfDonationProps
): Promise<Applicant[]> => {
  let allApplicantsOfDonation: Applicant[] = [];
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: dango,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedApplicantsOfDonation = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getAllApplicantsOfDonation",
        args: [_donationId],
      })) as Array<any>;

      for (
        let applicantId = 0;
        applicantId < fetchedApplicantsOfDonation.length;
        applicantId++
      ) {
        const fetchedApplicantOfDonationToBeParsed =
          fetchedApplicantsOfDonation[applicantId];

        const fetchedApplicantOfDonation: Applicant = {
          id: Number(fetchedApplicantOfDonationToBeParsed["id"]),
          walletAddress: fetchedApplicantOfDonationToBeParsed["walletAddress"],
          adjective: fetchedApplicantOfDonationToBeParsed["adjective"],
          gender: fetchedApplicantOfDonationToBeParsed["gender"],
          countryOfResidence:
            fetchedApplicantOfDonationToBeParsed["countryOfResidence"],
          ageBracket: fetchedApplicantOfDonationToBeParsed["ageBracket"],
          isNotBlank: fetchedApplicantOfDonationToBeParsed["isNotBlank"],
        };

        allApplicantsOfDonation.push(fetchedApplicantOfDonation);
      }

      return allApplicantsOfDonation;
    } catch (err) {
      console.info(err);
      return allApplicantsOfDonation;
    }
  }
  return allApplicantsOfDonation;
};

export type GetAllApplicantsOfDonationProps = {
  _donationId: number;
};
