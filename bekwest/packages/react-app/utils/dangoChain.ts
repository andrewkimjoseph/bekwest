import { Chain } from "viem";

export const dango = {
    id: 44787,
    name: 'Celo Dango',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://forno.dango.celo-testnet.org/'] },
    },
    blockExplorers: {
      default: { name: 'Block Scout', url: 'https://celo-dango.blockscout.com/' },
    },
  } as const satisfies Chain;
  