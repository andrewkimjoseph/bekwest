// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

struct Donor {
    uint256 id;
    address walletAddress;
    string adjective;
    string mainIndustryOfInterest;
    uint256 numberOfDonationsCreated;
    bool isNotBlank;
}

struct Donation {
    uint256 id;
    uint256 donorId;
    address donorWalletAddress;
    string topic;   
    string industry;
    uint256 maxNumberOfApplications;
    uint256 maxNumberOfVoters;
    uint256 amountDonatedInWei;
    uint256 currentNumberOfApplications;
    bool applicationIsClosed;
    bool votingIsClosed;
    bool isNotBlank;
}

struct Applicant {
    uint256 id;
    uint256 applicantId;
    address walletAddress;
    string adjective;
    string gender;
    string countryOfResidence;
    string ageBracket;
    bool isNotBlank;
}

struct Application {
    uint256 id;
    uint256 donorId;
    uint256 applicantId;
    string pitchStatement;
    bool isApproved;
    bool isNotBlank;
}

struct Voter {
    uint256 id;
    address walletAddress;
    string adjective;
    string gender;
    string countryOfResidence;
    bool isNotBlank;
}

struct Vote {
    uint256 id;
    uint256 voterId;
    uint256 applicantId;
    uint256 donationId;
    bool isRewarded;
    bool isNotBlank;
}

struct Result {
    uint256 id;
    uint256 donationId;
    uint256 applicantId;
    address applicantWalletAddress;
    uint256 voteCount;
    bool isNotBlank;
}

struct Grant {
    uint256 id;
    uint256 applicationId;
    address donationId;
    uint256 amountGrantedInWei;
    bool isNotBlank;
}

struct Reward {
    uint256 id;
    address voterWalletAddress;
    uint256 donationId;
    uint256 amountGrantedInWei;
    bool isNotBlank;
}