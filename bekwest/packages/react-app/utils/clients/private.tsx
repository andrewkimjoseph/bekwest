import { createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const privateClient = createWalletClient({
    chain: celoAlfajores,
    transport: custom(window.ethereum),
  });


  