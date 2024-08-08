export type Donation = {
  id: number;
  donorId: number;
  donorWalletAddress: `0x${string}`;
  topic: string;
  industry: string;
  maxNumberOfApplications: number;
  maxNumberOfVotes: number;
  amountDonatedInWei: number;
  applicationIsClosed: boolean;
  votingIsClosed: boolean;
  isNotBlank: boolean;
};
