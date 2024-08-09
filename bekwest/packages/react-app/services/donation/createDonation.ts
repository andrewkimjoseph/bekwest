import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, createWalletClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const createDonation = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _donorId,
    _donorWalletAddress,
    _topic,
    _industry,
    _maxNumberOfApplications,
    _maxNumberOfVotes,
    _amountDonated,
  }: CreateDonationProps
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
      const createDonationAccountTxnHash = await privateClient.writeContract({
        account: address,
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "createDonation",
        args: [
          _donorId,
          _donorWalletAddress,
          _topic,
          _industry,
          _maxNumberOfApplications,
          _maxNumberOfVotes,
          _amountDonated,
        ],
      });

      const createDonationTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createDonationAccountTxnHash,
        });

      if (createDonationTxnReceipt.status == "success") {
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
export type CreateDonationProps = {
  _donorId: number;
  _donorWalletAddress: `0x${string}`;
  _topic: string;
  _industry: string;
  _maxNumberOfApplications: number;
  _maxNumberOfVotes: number;
  _amountDonated: number;
};
