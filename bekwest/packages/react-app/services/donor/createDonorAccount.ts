import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, createWalletClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const createDonorAccount = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _donorWalletAddress,
    _adjective,
    _mainIndustryOfInterest,
  }: CreateDonorAccountProps
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
      const createDonorAccountTxnHash = await privateClient.writeContract({
        account: address,
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "createDonorAccount",
        args: [_donorWalletAddress, _adjective, _mainIndustryOfInterest],
      });

      const createDonorAccountTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createDonorAccountTxnHash,
        });

      if (createDonorAccountTxnReceipt.status == "success") {
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

export type CreateDonorAccountProps = {
  _donorWalletAddress: `0x${string}`;
  _adjective: string;
  _mainIndustryOfInterest: string;
};
