import { Applicant } from "@/entities/applicant";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getApplicantByWalletAddress = async (
    _signerAddress: `0x${string}` | undefined,
    { _applicantWalletAddress }: GetApplicantByWalletAddressProps
): Promise<Applicant | null> => {
    let applicant: Applicant | null = null;
    if (window.ethereum) {
        const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });
        try {
            const fetchedApplicant = (await publicClient.readContract({
                address: bekwestContractAddress,
                abi: bekwestContractABI,
                functionName: "getApplicantByWalletAddress",
                args: [_applicantWalletAddress],
            })) as any;

            applicant = {
                id: Number(fetchedApplicant["id"]),
                walletAddress: fetchedApplicant["walletAddress"],
                adjective: fetchedApplicant["adjective"],
                gender: fetchedApplicant["gender"],
                countryOfResidence: fetchedApplicant["countryOfResidence"],
                ageBracket: fetchedApplicant["ageBracket"],
                isNotBlank: fetchedApplicant["isNotBlank"],
            };

            return applicant;
        } catch (err) {
            console.info(err);
            return applicant;
        }
    }
    return applicant;
};

export type GetApplicantByWalletAddressProps = {
    _applicantWalletAddress: `0x${string}`;
};
