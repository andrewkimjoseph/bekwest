import { Donor } from "@/entities/donor";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getDonorByWalletAddress = async (
    _signerAddress: `0x${string}` | undefined,
    { _donorWalletAddress }: GetDonorByWalletAddress
): Promise<Donor | null> => {
    let donor: Donor | null = null;
    if (window.ethereum) {
        const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });
        try {
            const fetchedDonor = (await publicClient.readContract({
                address: bekwestContractAddress,
                abi: bekwestContractABI,
                functionName: "getDonorByWalletAddress",
                args: [_donorWalletAddress],
            })) as any;

            donor = {
                id: Number(fetchedDonor["id"]),
                walletAddress: fetchedDonor["walletAddress"],
                adjective: fetchedDonor["adjective"],
                mainIndustryOfInterest: fetchedDonor["mainIndustryOfInterest"],
                isNotBlank: fetchedDonor["isNotBlank"],
            };

            return donor;
        } catch (err) {
            console.info(err);
            return donor;
        }
    }
    return donor;
};

export type GetDonorByWalletAddress = {
    _donorWalletAddress: `0x${string}`;
};
