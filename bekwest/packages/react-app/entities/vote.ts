export type Vote = {
    id: number;
    voterId: number;
    applicantId: number;
    donationId: number;
    isRewarded: boolean;
    isNotBlank: boolean;
};
