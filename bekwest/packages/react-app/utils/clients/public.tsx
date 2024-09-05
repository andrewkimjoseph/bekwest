import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

export const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: custom(window.ethereum),
  });