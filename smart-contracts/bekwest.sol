// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import {Donor, Donation, Applicant, Application, Voter, Vote, Result, Grant, Reward} from "./bekwestStructs.sol";

contract bekwest {
    address bekwestOwnerWalletAddress =
        0x6dce6E80b113607bABf97041A0C8C5ACCC4d1a4e;

    // {address: donorWalletAddress}
    mapping(address => Donor) private allDonors;
    Donation[] private allDonations;

    // {address: applicantWalletAddress}
    mapping(address => Applicant) private allApplicants;
    Application[] private allApplications;

    // {address: voterWalletAddress}
    mapping(address => Voter) private allVoters;
    Vote[] private allVotes;

    // {uint256: donationId}, {address: applicantWalletAddress}
    mapping(uint256 => mapping(address => uint256))
        private allVoteCountsOfDonation;

    // {uint256: donationId}
    mapping(uint256 => Result[]) private allResultsOfDonation;

    Grant[] private allGrants;

    // {address: voterWalletAddress}
    mapping(address => Reward[]) private allRewards;

    // {uint256: donationId}, {address: applicantWalletAddress}
    mapping(uint256 => mapping(address => bool)) private applicationToDonation;

    // {uint256: donationId}, {address: voterWalletAddress}
    mapping(uint256 => mapping(address => bool)) private votingInDonation;

    uint256 currentDonorId;
    uint256 currentDonationId;
    uint256 currentApplicantId;
    uint256 currentApplicationId;
    uint256 currentVoterId;
    uint256 currentVoteId;
    uint256 currentResultId;
    uint256 currentGrantId;
    uint256 currentRewardId;
}
