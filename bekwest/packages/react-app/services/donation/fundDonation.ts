import { cUSDAlfajoresContractABI } from "@/utils/abis/cUSDAlfajoresContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { cUSDAlfajoresContractAddress } from "@/utils/addresses/cUSDAlfajoresContractAddress";
import {
    createPublicClient,
    createWalletClient,
    custom,
    parseEther,

  } from "viem";
  import { dango } from "@/utils/dangoChain";
 
  
  export const fundDonation = async (
    _signerAddress: `0x${string}` | undefined,
    { _amount }: FundDonationProps
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
        const fundDonationTxnHash = await privateClient.writeContract({
          account: address,
          address: cUSDAlfajoresContractAddress,
          abi: cUSDAlfajoresContractABI,
          functionName: "transfer",
          args: [bekwestContractAddress, parseEther(_amount.toString())],
        });
  
        const fundDonationTxnReceipt = await publicClient.waitForTransactionReceipt(
          {
            hash: fundDonationTxnHash,
          }
        );
  
        if (fundDonationTxnReceipt.status == "success") {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }
    return false;
  };
  
  export type FundDonationProps = {
    _amount: number;
  };