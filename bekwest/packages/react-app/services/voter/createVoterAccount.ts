import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, createWalletClient, custom } from "viem";
import { dango } from "@/utils/dangoChain";

export const createVoterAccount = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _voterWalletAddress,
    _adjective,
    _gender,
    _countryOfResidence,
  }: CreateVoterAccountProps
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
      const createVoterAccountTxnHash = await privateClient.writeContract({
        account: address,
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "createVoterAccount",
        args: [_voterWalletAddress, _adjective, _gender, _countryOfResidence],
      });

      const createVoterAccountTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createVoterAccountTxnHash,
        });

      if (createVoterAccountTxnReceipt.status == "success") {
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

export type CreateVoterAccountProps = {
  _voterWalletAddress: `0x${string}`;
  _adjective: string;
  _gender: string;
  _countryOfResidence: string;
};
