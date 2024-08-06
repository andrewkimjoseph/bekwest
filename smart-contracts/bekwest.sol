// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import {Donor, Donation, Applicant, Application, Voter, Vote, Grant, Reward} from "./bekwestStructs.sol";
import {ERC20} from "./bekwestInterfaces.sol";

contract bekwest {
    address bekwestWalletAddress = 0xE49B05F2c7DD51f61E415E1DFAc10B80074B001A;

    // cUSD token address on both Celo Alfajores and Celo Dango
    ERC20 cUSD = ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
    uint256 cUSDDecimalPlaces = 10**(cUSD.decimals());

    // {address: donorWalletAddress}
    mapping(address => Donor) public allDonors;

    // {address: donorWalletAddress}
    mapping(address => uint256) public numbersOfDonationsCreatedByDonors;

    Donation[] public allDonations;

    // {uint256: donorId}
    mapping(uint256 => uint256) public numbersOfApplicationsForDonations;

    // {uint256: donorId}
    mapping(uint256 => uint256) public numbersOfVotesForDonations;

    // {address: applicantWalletAddress}
    mapping(address => Applicant) public allApplicants;
    Application[] public allApplications;

    // {address: applicantWalletAddress}
    mapping(address => uint256) public numbersOfApplicationsOfApplicants;

    // {address: applicantWalletAddress}
    mapping(address => uint256) public numbersOfVotesOfVoters;

    // {uint256: donorId, address: applicantWalletAddress}
    mapping(uint256 => address) public granteesOfDonations;

    // {address: voterWalletAddress}
    mapping(address => Voter) public allVoters;
    Vote[] public allVotes;

    // {uint256: donationId, address: applicantWalletAddress, uint256: voteCount}
    mapping(uint256 => mapping(address => uint256))
        public allVoteCountsOfApplicantsOfDonation;

    Grant[] public allGrants;

    // {address: voterWalletAddress}
    mapping(address => Reward[]) public allRewards;

    // {uint256: donationId}, {address: applicantWalletAddress}
    mapping(uint256 => mapping(address => bool)) public applicationsToDonations;

    // {uint256: donationId}, {address: voterWalletAddress}
    mapping(uint256 => mapping(address => bool)) public votingInDonation;

    uint256 public currentDonorId;
    uint256 public currentDonationId;
    uint256 public currentApplicantId;
    uint256 public currentApplicationId;
    uint256 public currentVoterId;
    uint256 public currentVoteId;
    uint256 public currentGrantId;
    uint256 public currentRewardId;

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
        uint256 _maxNumberOfVotes,
        uint256 _amountDonated
    ) public {
        uint256 newDonationId = currentDonationId;

        Donation memory newDonation;

        newDonation.id = newDonationId;
        newDonation.donorId = _donorId;
        newDonation.donorWalletAddress = _donorWalletAddress;
        newDonation.topic = _topic;
        newDonation.industry = _industry;
        newDonation.maxNumberOfApplications = _maxNumberOfApplications;
        newDonation.maxNumberOfVotes = _maxNumberOfVotes;
        newDonation.isNotBlank = true;

        uint256 amountDonatedInWei = _amountDonated * cUSDDecimalPlaces;
        newDonation.amountDonatedInWei = amountDonatedInWei;

        allDonations.push(newDonation);

        uint256 currentNumberOfDonationsCreatedByDonor = numbersOfDonationsCreatedByDonors[
                _donorWalletAddress
            ];
        uint256 newNumberOfDonationsCreatedByDonor = currentNumberOfDonationsCreatedByDonor +
                1;
        numbersOfDonationsCreatedByDonors[
            _donorWalletAddress
        ] = newNumberOfDonationsCreatedByDonor;


        currentDonationId++;
    }

    function getDonationById(uint256 _donationId)
        public
        view
        returns (Donation memory)
    {
        return allDonations[_donationId];
    }

    function getApplicationById(uint256 _applicationId)
        public
        view
        returns (Application memory)
    {
        return allApplications[_applicationId];
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
                applicationOfApplicantForDonation = runningApplication;
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
        Donation memory appliedDonation = getDonationById(_donationId);

        if (appliedDonation.applicationIsClosed) revert();

        if (
            checkIfApplicantHasAlreadyMadeAnApplicationToDonation(
                _donationId,
                _applicantWalletAddress
            )
        ) revert();
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

        // TO DO - Close application

        if (
            newNumberOfApplicationsForDonation ==
            appliedDonation.maxNumberOfApplications
        ) {
            closeApplicationOfDonation(_donationId);
        }
    }

    function createVoterAccount(
        address _voterWalletAddress,
        string memory _adjective,
        string memory _gender,
        string memory _countryOfResidence
    ) public {
        uint256 newVoterId = currentVoterId;

        Voter memory newVoter;

        newVoter.id = newVoterId;
        newVoter.walletAddress = _voterWalletAddress;
        newVoter.adjective = _adjective;
        newVoter.gender = _gender;
        newVoter.countryOfResidence = _countryOfResidence;
        newVoter.isNotBlank = true;

        allVoters[_voterWalletAddress] = newVoter;

        currentVoterId++;
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

                break;
            }
        }

        return totalAmountOfRewardsGivenToVoterInWei;
    }

    function getVoterByWalletAddress(address _voterWalletAddress)
        public
        view
        returns (Voter memory)
    {
        return allVoters[_voterWalletAddress];
    }

    function getTotalAmountOfVotesMadeByVoter(address _voterWalletAddress)
        public
        view
        returns (uint256)
    {
        return numbersOfVotesOfVoters[_voterWalletAddress];
    }

    function checkIfVoterHasAlreadyMadeAVoteInDonation(
        uint256 _donationId,
        address _voterWalletAddress
    ) public view returns (bool) {
        return votingInDonation[_donationId][_voterWalletAddress];
    }

    function getVoteOfVoterForDonation(
        uint256 _donationId,
        address _voterWalletAddress
    ) public view returns (Vote memory) {
        Vote memory voteOfVoterForDonation;

        Voter memory particularVoter = getVoterByWalletAddress(
            _voterWalletAddress
        );

        for (uint256 voteId = 0; voteId < allVotes.length; voteId++) {
            Vote memory runningVote = allVotes[voteId];

            if (
                runningVote.donationId == _donationId &&
                runningVote.voterId == particularVoter.id
            ) {
                voteOfVoterForDonation = runningVote;
                break;
            }
        }

        return voteOfVoterForDonation;
    }

    function getPotentialAmountOfRewardOfDonationInWei(uint256 _donationId)
        public
        view
        returns (uint256)
    {
        uint256 numberOfVotesForDonation = numbersOfVotesForDonations[
            _donationId
        ];

        if (numberOfVotesForDonation == 0) {
            return
                ((getDonationById(_donationId).amountDonatedInWei * 10) / 100) /
                1;
        }

        return
            ((getDonationById(_donationId).amountDonatedInWei * 10) / 100) /
            numberOfVotesForDonation;
    }

    function getPotentialAmountOfRewardToBekwest(uint256 _donationId)
        public
        view
        returns (uint256)
    {
        return (getDonationById(_donationId).amountDonatedInWei * 10) / 100;
    }

    function makeAVote(
        uint256 _donationId,
        uint256 _applicationId,
        address _applicantWalletAddress,
        address _voterWalletAddress
    ) public {
        Donation memory particularDonation = getDonationById(_donationId);
        if (particularDonation.votingIsClosed) revert();

        if (
            checkIfVoterHasAlreadyMadeAVoteInDonation(
                _donationId,
                _voterWalletAddress
            )
        ) revert();

        // If voting is not closed and voter has not yet casted their vote, proceed

        Application memory votedForApplication = getApplicationById(
            _applicationId
        );

        uint256 newVoteId = currentVoteId;
        // Fetch voter
        Voter memory votingVoter = getVoterByWalletAddress(_voterWalletAddress);

        // Create vote
        Vote memory newVote;
        newVote.id = newVoteId;
        newVote.voterId = votingVoter.id;
        newVote.applicantId = votedForApplication.applicantId;
        newVote.donationId = _donationId;
        newVote.isNotBlank = true;

        uint256 donationId = particularDonation.id;

        // Mark voter as having voted in this donation
        votingInDonation[donationId][votingVoter.walletAddress] = true;

        // Reward voter
        sendRewardToVoter(donationId, votingVoter.walletAddress);

        // Update number of votes of donation
        uint256 currentNumberOfVotesOfDonation = numbersOfVotesForDonations[
            donationId
        ];
        uint256 newNumberOfVotesOfDonation = currentNumberOfVotesOfDonation + 1;
        numbersOfVotesForDonations[donationId] = newNumberOfVotesOfDonation;

        // Update number of votes of this voter
        uint256 currentNumberOfVotesOfVoter = numbersOfVotesOfVoters[
            votingVoter.walletAddress
        ];
        uint256 newNumberOfVotesOfVoter = currentNumberOfVotesOfVoter + 1;
        numbersOfVotesOfVoters[
            votingVoter.walletAddress
        ] = newNumberOfVotesOfVoter;

        // Update number of votes for this [Applicant]'s result
        uint256 currentNumberOfVotesOfApplicant = allVoteCountsOfApplicantsOfDonation[
                donationId
            ][_applicantWalletAddress];
        uint256 newNumberOfVotesOfApplicant = currentNumberOfVotesOfApplicant +
            1;
        allVoteCountsOfApplicantsOfDonation[donationId][
            votedForApplication.applicantWalletAddress
        ] = newNumberOfVotesOfApplicant;

        if (newNumberOfVotesOfDonation == particularDonation.maxNumberOfVotes) {
            // Close [Donation]
            closeVotingOfDonation(donationId);
            // Pay out winning [Applicant]
            sendGrantToWinningApplicant(
                donationId,
                votedForApplication.applicantId
            );
            // Pay out contract owner
            sendRewardToBekwest(donationId);
        }

        currentVoteId++;
    }

    function sendGrantToWinningApplicant(
        uint256 _donationId,
        uint256 _applicantId
    ) private {
        Applicant memory winningApplicant = getWinningApplicantOfDonation(
            _donationId
        );

        uint256 amountGrantedInWei = getPotentialAmountOfGrantOfDonationInWei(
            _donationId
        );

        uint256 newGrantId = currentGrantId;

        Grant memory newGrant;

        newGrant.id = newGrantId;
        newGrant.donationId = _donationId;
        newGrant.applicantId = _applicantId;
        newGrant.applicantWalletAddress = winningApplicant.walletAddress;
        newGrant.amountGrantedInWei = amountGrantedInWei;
        newGrant.isNotBlank = true;

        allGrants.push(newGrant);

        cUSD.transfer(winningApplicant.walletAddress, amountGrantedInWei);
        currentGrantId++;
    }

    function sendRewardToVoter(uint256 _donationId, address _voterWalletAddress)
        private
    {
        uint256 newRewardId = currentRewardId;

        Voter memory voterToBeRewarded = getVoterByWalletAddress(
            _voterWalletAddress
        );
        uint256 amountRewardedInWei = getPotentialAmountOfRewardOfDonationInWei(
            _donationId
        );

        Reward memory newReward;

        newReward.id = newRewardId;
        newReward.voterId = voterToBeRewarded.id;
        newReward.voterWalletAddress = voterToBeRewarded.walletAddress;
        newReward.donationId = _donationId;
        newReward.amountRewardedInWei = amountRewardedInWei;
        newReward.isNotBlank = true;

        allRewards[_voterWalletAddress].push(newReward);

        cUSD.transfer(_voterWalletAddress, amountRewardedInWei);

        currentRewardId++;
    }

    function sendRewardToBekwest(uint256 _donationId) private {
        uint256 amountRewardedInWei = getPotentialAmountOfRewardToBekwest(
            _donationId
        );
        cUSD.transfer(bekwestWalletAddress, amountRewardedInWei);
    }

    function closeVotingOfDonation(uint256 _donationId) private {
        Donation memory donationToBeClosed = getDonationById(_donationId);
        donationToBeClosed.votingIsClosed = true;
        allDonations[_donationId] = donationToBeClosed;
    }

    function closeApplicationOfDonation(uint256 _donationId) private {
        Donation memory donationToBeClosed = getDonationById(_donationId);
        donationToBeClosed.applicationIsClosed = true;
        allDonations[_donationId] = donationToBeClosed;
    }

    function getVoteCountOfApplicantOfDonation(
        uint256 _donationId,
        address _applicantWalletAddress
    ) public view returns (uint256) {
        return
            allVoteCountsOfApplicantsOfDonation[_donationId][
                _applicantWalletAddress
            ];
    }

    function getWinningApplicantOfDonation(uint256 _donationId)
        public
        view
        returns (Applicant memory)
    {
        uint256 runningVoteCount = 0;
        Applicant memory winningApplicant;

        Applicant[] memory applicantsOfDonation = getAllApplicantsOfDonation(
            _donationId
        );

        // Iterate through the applicants array to find the one with the highest votes
        for (
            uint256 applicantId = 0;
            applicantId < applicantsOfDonation.length;
            applicantId++
        ) {
            Applicant memory runningApplicant = applicantsOfDonation[
                applicantId
            ];
            uint256 voteCount = allVoteCountsOfApplicantsOfDonation[
                _donationId
            ][runningApplicant.walletAddress];

            if (voteCount > runningVoteCount) {
                runningVoteCount = voteCount;
                winningApplicant = applicantsOfDonation[applicantId];
            }
        }

        return winningApplicant;
    }

    function getGranteeOfDonation(uint256 _donationId)
        public
        view
        returns (Applicant memory)
    {
        address applicantWalletAddress = granteesOfDonations[_donationId];
        Applicant memory grantee = getApplicantByWalletAddress(
            applicantWalletAddress
        );
        return grantee;
    }
}

// First deployment address - 0x24E31f08335DD02Ac02d2C8BEb976a9d6370A0C2
//
// Donor wallet address - 0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93 - The Old Lad
// ...
// Applicant wallet address 1 - 0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93 - The Old Lad
// Applicant wallet address 2 - 0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5 - The Old Lord
// ...
// Voter wallet address 1 - 0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93 - The Old Lad
// Voter wallet address 2 - 0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5 - The Old Lord
// Voter wallet address 3 - 0x1c30082ae6F51E31F28736be3f715261223E4EDe - The Old Lady
// ...
