import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

declare global {
  interface Window {
    ethereum?: any;
  }
}

let publicClient;

if (typeof window !== "undefined" && window.ethereum) {
  publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: custom(window.ethereum),
  });
} else {
  console.error("Ethereum provider is not available.");
}

export { publicClient };
