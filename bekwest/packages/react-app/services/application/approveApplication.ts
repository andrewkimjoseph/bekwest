import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, createWalletClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const approveApplication = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _applicationId,
        _donationId
    }: ApproveApplicationProps
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
            const approveApplicationTxnHash = await privateClient.writeContract({
                account: address,
                address: bekwestContractAddress,
                abi: bekwestContractABI,
                functionName: "approveApplication",
                args: [
                    _applicationId,
                    _donationId
                ],
            });

            const approveApplicationTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: approveApplicationTxnHash,
                });

            if (approveApplicationTxnReceipt.status == "success") {
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
export type ApproveApplicationProps = {
    _applicationId: number;
    _donationId: number;
};
