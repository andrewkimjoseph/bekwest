import { Application } from "@/entities/application";
import { bekwestContractABI } from "@/utils/abis/bekwestContractABI";
import { bekwestContractAddress } from "@/utils/addresses/bewkestContractAddress";
import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const getApplicationById = async (
  _signerAddress: `0x${string}` | undefined,
  {  _applicationId }: GetApplicationByIdProps
): Promise<Application | null> => {
  let application: Application | null = null;
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });
    try {
      const fetchedApplication = (await publicClient.readContract({
        address: bekwestContractAddress,
        abi: bekwestContractABI,
        functionName: "getApplicationById",
        args: [_applicationId],
      })) as any;

      application = {
        id: Number(fetchedApplication["id"]),
        applicantId: Number(fetchedApplication["applicantId"]),
        applicantWalletAddress: fetchedApplication["applicantWalletAddress"],
        donationId: Number(fetchedApplication["donationId"]),
        pitchStatement: fetchedApplication["pitchStatement"],
        isApproved: fetchedApplication["isApproved"],
        isNotBlank: fetchedApplication["isNotBlank"],
      };

      return application;
    } catch (err) {
      console.info(err);
      return application;
    }
  }
  return application;
};

export type GetApplicationByIdProps = {
  _applicationId: number;
};
