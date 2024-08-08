import { formatUnits } from "viem/utils";

export const parseWeiAmountToEther = (amount: number) => {
    return Number(formatUnits(BigInt(amount ?? 0), 18));
  };