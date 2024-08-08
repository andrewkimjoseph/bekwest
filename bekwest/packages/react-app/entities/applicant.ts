export type Applicant = {
    id: number;
    applicantId: number;
    walletAddress: `0x${string}`;
    adjective: string;
    gender: string;
    countryOfResidence: string;
    ageBracket: string;
    isNotBlank: boolean;
};