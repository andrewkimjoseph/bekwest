import { createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";

declare global {
  interface Window {
    ethereum?: any;
  }
}

let privateClient;

if (typeof window !== "undefined" && window.ethereum) {
  privateClient = createWalletClient({
    chain: celoAlfajores,
    transport: custom(window.ethereum),
  });
} else {
  console.error("Ethereum provider is not available.");
}

export { privateClient };
