// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

struct Donor {
    uint256 id;
    address walletAddress;
    string adjective;
    string mainIndustryOfInterest;
    uint256 numberOfDonationsCreated;
    bool isBlank;
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
    bool isBlank;
}

struct Applicant {
    uint256 id;
    uint256 applicantId;
    address walletAddress;
    string adjective;
    string gender;
    string countryOfResidence;
    string ageBracket;
    bool isBlank;
}

struct Application {
    uint256 id;
    uint256 donorId;
    uint256 applicantId;
    string pitchStatement;
    bool isApproved;
    bool isBlank;
}

struct Voter {
    uint256 id;
    address walletAddress;
    string adjective;
    string gender;
    string countryOfResidence;
    bool isBlank;
}

struct Vote {
    uint256 id;
    uint256 voterId;
    uint256 applicantId;
    uint256 donationId;
    bool isRewarded;
    bool isBlank;
}

struct Result {
    uint256 id;
    uint256 donationId;
    uint256 applicantId;
    address applicantWalletAddress;
    uint256 voteCount;
    bool isBlank;
}

struct Grant {
    uint256 id;
    uint256 applicationId;
    address donationId;
    uint256 amountGrantedInWei;
    bool isBlank;
}

struct Reward {
    uint256 id;
    address voterWalletAddress;
    uint256 donationId;
    uint256 amountGrantedInWei;
    bool isBlank;
}