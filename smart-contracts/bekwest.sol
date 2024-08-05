// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import {Donor, Donation, Applicant, Application, Voter, Vote, Result, Grant, Reward} from "./bekwestStructs.sol";

contract bekwest {
    address bekwestOwnerWalletAddress =
        0x6dce6E80b113607bABf97041A0C8C5ACCC4d1a4e;

    // {address: donorWalletAddress}
    mapping(address => Donor) private allDonors;

    // {address: donorWalletAddress}
    mapping(address => uint256) private numbersOfDonationsCreatedByDonors;

    Donation[] private allDonations;

    // {uint256: donorId}
    mapping(uint256 => uint256) private numbersOfApplicationsForDonations;

    // {uint256: donorId}
    mapping(uint256 => uint256) private numbersOfVotesForDonations;

    // {address: applicantWalletAddress}
    mapping(address => Applicant) private allApplicants;
    Application[] private allApplications;

    // {address: applicantWalletAddress}
    mapping(address => uint256) private numbersOfApplicationsOfApplicants;

    // {address: voterWalletAddress}
    mapping(address => Voter) private allVoters;
    Vote[] private allVotes;

    // {uint256: donationId}, {address: applicantWalletAddress}
    mapping(uint256 => mapping(address => uint256))
        private allVoteCountsOfAllVotersOfAllDonations;

    // {uint256: donationId}
    mapping(uint256 => Result[]) private allResultsOfDonation;

    Grant[] private allGrants;

    // {address: voterWalletAddress}
    mapping(address => Reward[]) private allRewards;

    // {uint256: donationId}, {address: applicantWalletAddress}
    mapping(uint256 => mapping(address => bool))
        private applicationsToDonations;

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

    function checkIfDonorExists(address _donorWalletAddress)
        public
        view
        returns (bool)
    {
        return allDonors[_donorWalletAddress].isNotBlank;
    }

    function checkIfApplicantExists(address _applicantWalletAddress)
        public
        view
        returns (bool)
    {
        return allApplicants[_applicantWalletAddress].isNotBlank;
    }

    function checkIfVoterExists(address _voterWalletAddress)
        public
        view
        returns (bool)
    {
        return allVoters[_voterWalletAddress].isNotBlank;
    }

    function createDonorAccount(
        address _donorWalletAddress,
        string memory _adjective,
        string memory _mainIndustryOfInterest
    ) public {
        uint256 newDonorId = currentDonorId;

        Donor memory newDonor;

        newDonor.id = newDonorId;
        newDonor.walletAddress = _donorWalletAddress;
        newDonor.adjective = _adjective;
        newDonor.mainIndustryOfInterest = _mainIndustryOfInterest;
        newDonor.numberOfDonationsCreated = 0;
        newDonor.isNotBlank = true;

        allDonors[_donorWalletAddress] = newDonor;
        currentDonorId++;
    }

    function getDonorByWalletAddress(address _donorWalletAddress)
        public
        view
        returns (Donor memory)
    {
        return allDonors[_donorWalletAddress];
    }

    function getAllDonationsCreatedByDonor(address _donorWalletAddress)
        public
        view
        returns (Donation[] memory)
    {
        uint256 numberOfDonationsCreatedByParticipant = numbersOfDonationsCreatedByDonors[
                _donorWalletAddress
            ];

        Donation[] memory allDonationsCreatedByDonor = new Donation[](
            numberOfDonationsCreatedByParticipant
        );

        uint256 donationIndex = 0;

        for (
            uint256 donationId = 0;
            donationId < allDonations.length;
            donationId++
        ) {
            Donation memory runningDonation = allDonations[donationId];

            if (runningDonation.donorWalletAddress == _donorWalletAddress) {
                allDonationsCreatedByDonor[donationIndex] = runningDonation;
                donationIndex++;

                if (donationIndex == numberOfDonationsCreatedByParticipant) {
                    break;
                }
            }
        }

        return allDonationsCreatedByDonor;
    }

    function createDonation(
        uint256 _donorId,
        address _donorWalletAddress,
        string memory _topic,
        string memory _industry,
        uint256 _maxNumberOfApplications,
        uint256 _maxNumberOfVoters,
        uint256 _amountDonatedInWei
    ) public {
        uint256 newDonationId = currentDonationId;

        Donation memory newDonation;

        newDonation.id = newDonationId;
        newDonation.donorId = _donorId;
        newDonation.donorWalletAddress = _donorWalletAddress;
        newDonation.topic = _topic;
        newDonation.industry = _industry;
        newDonation.maxNumberOfApplications = _maxNumberOfApplications;
        newDonation.maxNumberOfVoters = _maxNumberOfVoters;
        newDonation.amountDonatedInWei = _amountDonatedInWei;

        uint256 currentNumberOfApplicationsForDonations = 0;
        numbersOfApplicationsForDonations[
            newDonationId
        ] = currentNumberOfApplicationsForDonations;

        uint256 currentNumberOfDonationsCreatedByDonor = numbersOfDonationsCreatedByDonors[
                _donorWalletAddress
            ];
        uint256 newNumberOfDonationsCreatedByDonor = currentNumberOfDonationsCreatedByDonor +
                1;
        numbersOfDonationsCreatedByDonors[
            _donorWalletAddress
        ] = newNumberOfDonationsCreatedByDonor;

        allDonations.push(newDonation);

        currentDonationId++;
    }

    function getDonationById(uint256 _donationId)
        public
        view
        returns (Donation memory)
    {
        return allDonations[_donationId];
    }

    function getApplicantByWalletAddress(address _applicantWalletAddress)
        public
        view
        returns (Applicant memory)
    {
        return allApplicants[_applicantWalletAddress];
    }

    function getAllApplicantsOfDonation(uint256 _donationId)
        public
        view
        returns (Applicant[] memory)
    {
        uint256 numberOfApplicationsOfDonation = numbersOfApplicationsForDonations[
                _donationId
            ];

        Applicant[] memory allApplicantsOfDonations = new Applicant[](
            numberOfApplicationsOfDonation
        );

        uint256 applicantIndex = 0;

        for (
            uint256 applicationId = 0;
            applicationId < allApplications.length;
            applicationId++
        ) {
            Application memory runningApplicaton = allApplications[
                applicationId
            ];

            if (runningApplicaton.donationId == _donationId) {
                allApplicantsOfDonations[
                    applicantIndex
                ] = getApplicantByWalletAddress(
                    runningApplicaton.applicantWalletAddress
                );

                applicantIndex++;

                if (applicantIndex == numberOfApplicationsOfDonation) {
                    break;
                }
            }
        }

        return allApplicantsOfDonations;
    }

    function getAllApplicationsOfDonation(uint256 _donationId)
        public
        view
        returns (Application[] memory)
    {
        uint256 numberOfApplicationsOfDonation = numbersOfApplicationsForDonations[
                _donationId
            ];

        Application[] memory allApplicationsOfDonations = new Application[](
            numberOfApplicationsOfDonation
        );

        uint256 applicationIndex = 0;

        for (
            uint256 applicationId = 0;
            applicationId < allApplications.length;
            applicationId++
        ) {
            Application memory runningApplicaton = allApplications[
                applicationId
            ];

            if (runningApplicaton.donationId == _donationId) {
                allApplicationsOfDonations[
                    applicationIndex
                ] = runningApplicaton;

                applicationIndex++;

                if (applicationIndex == numberOfApplicationsOfDonation) {
                    break;
                }
            }
        }

        return allApplicationsOfDonations;
    }

    function getApplicantOfDonation(uint256 _applicationId)
        public
        view
        returns (Applicant memory)
    {
        Application memory applicationOfDonation = allApplications[
            _applicationId
        ];

        Applicant memory applicantOfDonation = getApplicantByWalletAddress(
            applicationOfDonation.applicantWalletAddress
        );

        return applicantOfDonation;
    }

    function approveApplication(uint256 _applicationId) public {
        Application memory applicationToBeApproved = allApplications[
            _applicationId
        ];
        applicationToBeApproved.isApproved = true;
        allApplications[_applicationId] = applicationToBeApproved;
    }

    function createApplicantAccount(
        address _applicantWalletAddress,
        string memory _adjective,
        string memory _gender,
        string memory _countryOfResidence,
        string memory _ageBracket
    ) public {
        uint256 newApplicantId = currentApplicantId;

        Applicant memory newApplicant;

        newApplicant.id = newApplicantId;
        newApplicant.walletAddress = _applicantWalletAddress;
        newApplicant.adjective = _adjective;
        newApplicant.gender = _gender;
        newApplicant.countryOfResidence = _countryOfResidence;
        newApplicant.ageBracket = _ageBracket;
        newApplicant.isNotBlank = true;

        allApplicants[_applicantWalletAddress] = newApplicant;
        currentApplicantId++;
    }

    function getAllDonations() public view returns (Donation[] memory) {
        return allDonations;
    }

    function getApplicationsOfApplicant(address _applicantWalletAddress)
        public
        view
        returns (Application[] memory)
    {
        uint256 numberOfApplicationsOfApplicant = numbersOfApplicationsOfApplicants[
                _applicantWalletAddress
            ];

        Application[] memory allApplicationsOfApplicant = new Application[](
            numberOfApplicationsOfApplicant
        );

        uint256 applicationIndex = 0;

        for (
            uint256 applicationId = 0;
            applicationId < allApplications.length;
            applicationId++
        ) {
            Application memory runningApplication = allApplications[
                applicationId
            ];

            if (
                runningApplication.applicantWalletAddress ==
                _applicantWalletAddress
            ) {
                allApplicationsOfApplicant[
                    applicationIndex
                ] = runningApplication;

                applicationIndex++;

                if (applicationIndex == numberOfApplicationsOfApplicant) {
                    break;
                }
            }
        }

        return allApplicationsOfApplicant;
    }

    function getTotalAmountOfGrantsGivenToApplicantInWei(
        address _applicantWalletAddress
    ) public view returns (uint256) {
        uint256 totalAmountOfGrantGivenToApplicantInWei = 0;

        for (uint256 grantId = 0; grantId < allGrants.length; grantId++) {
            Grant memory runningGrant = allGrants[grantId];

            if (
                runningGrant.applicantWalletAddress == _applicantWalletAddress
            ) {
                totalAmountOfGrantGivenToApplicantInWei += runningGrant
                    .amountGrantedInWei;
            }
        }

        return totalAmountOfGrantGivenToApplicantInWei;
    }

    function getTotalAmountOfVotesForDonation(uint256 _donationId)
        public
        view
        returns (uint256)
    {
        return numbersOfVotesForDonations[_donationId];
    }

    function getApplicationOfApplicantForDonation(
        uint256 _donationId,
        uint256 _applicationId,
        address _applicantWalletAddress
    ) public view returns (Application memory) {
        Application[]
            memory allApplicationsOfApplicant = getApplicationsOfApplicant(
                _applicantWalletAddress
            );

        Application memory applicationOfApplicantForDonation;

        for (
            uint256 applicationId = 0;
            applicationId < allApplicationsOfApplicant.length;
            applicationId++
        ) {
            Application memory runningApplication = allApplicationsOfApplicant[
                applicationId
            ];

            if (
                runningApplication.donationId == _donationId &&
                runningApplication.id == _applicationId
            ) {
                applicationOfApplicantForDonation.id = runningApplication.id;
                applicationOfApplicantForDonation
                    .applicantId = runningApplication.applicantId;
                applicationOfApplicantForDonation
                    .applicantWalletAddress = runningApplication
                    .applicantWalletAddress;
                applicationOfApplicantForDonation
                    .donationId = runningApplication.donationId;

                applicationOfApplicantForDonation
                    .pitchStatement = runningApplication.pitchStatement;

                applicationOfApplicantForDonation
                    .isApproved = runningApplication.isApproved;

                applicationOfApplicantForDonation
                    .isNotBlank = runningApplication.isNotBlank;
            }
        }

        return applicationOfApplicantForDonation;
    }

    function getPotentialAmountOfGrantOfDonationInWei(uint256 _donationId)
        public
        view
        returns (uint256)
    {
        return (getDonationById(_donationId).amountDonatedInWei * 80) / 100;
    }

    function checkIfApplicantHasAlreadyMadeAnApplicationToDonation(
        uint256 _donationId,
        address _applicantWalletAddress
    ) public view returns (bool) {
        return applicationsToDonations[_donationId][_applicantWalletAddress];
    }

    function makeApplication(
        uint256 _donationId,
        uint256 _applicantId,
        address _applicantWalletAddress,
        string memory _pitchStatement
    ) public {
        uint256 newApplicationId = currentApplicationId;

        Application memory newApplication;

        newApplication.id = newApplicationId;

        newApplication.applicantId = _applicantId;

        newApplication.applicantWalletAddress = _applicantWalletAddress;

        newApplication.donationId = _donationId;

        newApplication.pitchStatement = _pitchStatement;
        newApplication.isNotBlank = true;
        allApplications.push(newApplication);

        uint256 currentNumberOfApplicationsForDonation = numbersOfApplicationsForDonations[
                _donationId
            ];

        uint256 newNumberOfApplicationsForDonation = currentNumberOfApplicationsForDonation +
                1;

        numbersOfApplicationsForDonations[
            _donationId
        ] = newNumberOfApplicationsForDonation;

        uint256 currentNumberOfApplicationsOfApplicant = numbersOfApplicationsOfApplicants[
                _applicantWalletAddress
            ];

        uint256 newNumberOfApplicationsOfApplicant = currentNumberOfApplicationsOfApplicant +
                1;

        numbersOfApplicationsOfApplicants[
            _applicantWalletAddress
        ] = newNumberOfApplicationsOfApplicant;

        currentApplicationId++;
    }

    function getTotalAmountOfRewardsGivenToVoterInWei(
        uint256 _voterId,
        address _voterWalletAddress
    ) public view returns (uint256) {
        Reward[] memory allRewardsOfVoter = allRewards[_voterWalletAddress];
        uint256 totalAmountOfRewardsGivenToVoterInWei = 0;

        for (
            uint256 rewardId = 0;
            rewardId < allRewardsOfVoter.length;
            rewardId++
        ) {
            Reward memory runningReward = allRewardsOfVoter[rewardId];

            if (
                runningReward.voterId == _voterId &&
                runningReward.voterWalletAddress == _voterWalletAddress
            ) {
                totalAmountOfRewardsGivenToVoterInWei += runningReward
                    .amountRewardedInWei;
            }
        }

        return 0;
    }

    function getVoterByWalletAddress(address _voterWalletAddress)
        public
        view
        returns (Voter memory)
    {
        return allVoters[_voterWalletAddress];
    }
}
