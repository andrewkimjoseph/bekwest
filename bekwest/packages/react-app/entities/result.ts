export type Result = {
    id: number;
    donationId: number;
    applicantId: number;
    applicantWalletAddress: `0x${string}`;
    voteCount: number;
    isNotBlank: boolean;
};