export type Application = {
    id: number;
    applicantId: number;
    applicantWalletAddress: `0x${string}`;
    donationId: number;
    pitchStatement: string;
    isApproved: boolean;
    isNotBlank: boolean;
};