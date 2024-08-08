import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const makeApplication = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _donationId,
    _applicantId,
    _applicantWalletAddress,
    _pitchStatement,
  }: MakeApplicationProps
): Promise<boolean> => {
  if (window.ethereum) {
    const privateClient = createWalletClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    const [address] = await privateClient.getAddresses();
    try {
      const makeApplicationTxnHash = await privateClient.writeContract({
        account: address,
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "makeApplication",
        args: [
          _donationId,
          _applicantId,
          _applicantWalletAddress,
          _pitchStatement,
        ],
      });

      const makeApplicationTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: makeApplicationTxnHash,
        });

      if (makeApplicationTxnReceipt.status == "success") {
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
export type MakeApplicationProps = {
  _donationId: number;
  _applicantId: number;
  _applicantWalletAddress: `0x${string}`;
  _pitchStatement: string;
};
