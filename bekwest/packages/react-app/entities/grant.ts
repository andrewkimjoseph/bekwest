export type Grant = {
    id: number;
    donationId: number;
    applicationId: number;
    applicantId: number;
    applicantWalletAddress: `0x${string}`;
    amountGrantedInWei: bigint;
    isNotBlank: boolean;
};