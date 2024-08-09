import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, createWalletClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const makeAVote = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _donationId,
        _applicationId,
        _applicantWalletAddress,
        _voterWalletAddress
    }: MakeAVoteProps
): Promise<boolean> => {
    if (window.ethereum) {
        const privateClient = createWalletClient({
            chain: dango,
            transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
            chain: dango,
            transport: custom(window.ethereum),
        });
        const [address] = await privateClient.getAddresses();
        try {
            const makeAVoteTxnHash = await privateClient.writeContract({
                account: address,
                address: bekwestContractAddress,
                abi: bekwestContractABI,
                functionName: "makeAVote",
                args: [_donationId,
                    _applicationId,
                    _applicantWalletAddress,
                    _voterWalletAddress],
            });

            const makeAVoteTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: makeAVoteTxnHash,
                });

            if (makeAVoteTxnReceipt.status == "success") {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    return false;
};

export type MakeAVoteProps = {
    _donationId: number;
    _applicationId: number;
    _applicantWalletAddress: `0x${string}`;
    _voterWalletAddress: `0x${string}`;
};
