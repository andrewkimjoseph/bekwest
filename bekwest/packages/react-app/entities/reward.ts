export type Reward = {
    id: number;
    voterId: number;
    voterWalletAddress: `0x${string}`;
    donationId: number;
    amountRewardedInWei: bigint;
    isNotBlank: boolean;
};