import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { dango } from "@/utils/dangoChain";
import { createPublicClient, createWalletClient, custom } from "viem";

export const createApplicantAccount = async (
  _signerAddress: `0x${string}` | undefined,
  {
    _applicantWalletAddress,
    _adjective,
    _gender,
    _countryOfResidence,
    _ageBracket,
  }: CreateApplicantAccountProps
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
      const createApplicantAccountTxnHash = await privateClient.writeContract({
        account: address,
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "createApplicantAccount",
        args: [
            _applicantWalletAddress,
            _adjective,
            _gender,
            _countryOfResidence,
            _ageBracket,
        ],
      });

      const createApplicantAccountTxnReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: createApplicantAccountTxnHash,
        });

      if (createApplicantAccountTxnReceipt.status == "success") {
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
export type CreateApplicantAccountProps = {
  _applicantWalletAddress: `0x${string}`;
  _adjective: string;
  _gender: string;
  _countryOfResidence: string;
  _ageBracket: string;
};
