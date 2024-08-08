import { Voter } from "@/entities/voter";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getVoterByWalletAddress = async (
    _signerAddress: `0x${string}` | undefined,
    { _voterWalletAddress }: GetVoterByWalletAddressProps
): Promise<Voter | null> => {
    let voter: Voter | null = null;
    if (window.ethereum) {
        const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });
        try {
            const fetchedVoter = (await publicClient.readContract({
                address: bekwestContractAddress,
                abi: bekwestContractABI,
                functionName: "getVoterByWalletAddress",
                args: [_voterWalletAddress],
            })) as any;

            voter = {
                id: Number(fetchedVoter["id"]),
                walletAddress: fetchedVoter["walletAddress"],
                adjective: fetchedVoter["adjective"],
                gender: fetchedVoter["gender"],
                countryOfResidence: fetchedVoter["countryOfResidence"],
                isNotBlank: fetchedVoter["isNotBlank"],
            };

            return voter;
        } catch (err) {
            console.info(err);
            return voter;
        }
    }
    return voter;
};

export type GetVoterByWalletAddressProps = {
    _voterWalletAddress: `0x${string}`;
};
