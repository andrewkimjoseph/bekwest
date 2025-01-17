export const bekwestContractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "approveApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_adjective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_countryOfResidence",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ageBracket",
        "type": "string"
      }
    ],
    "name": "createApplicantAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donorId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_donorWalletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_topic",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_industry",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_maxNumberOfApplications",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxNumberOfVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amountDonated",
        "type": "uint256"
      }
    ],
    "name": "createDonation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_donorWalletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_adjective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mainIndustryOfInterest",
        "type": "string"
      }
    ],
    "name": "createDonorAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_adjective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_countryOfResidence",
        "type": "string"
      }
    ],
    "name": "createVoterAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_applicantId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_pitchStatement",
        "type": "string"
      }
    ],
    "name": "makeApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "makeAVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allApplicants",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "applicantId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "adjective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "countryOfResidence",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ageBracket",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allApplications",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "applicantId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "applicantWalletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "donationId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "pitchStatement",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isApproved",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allDonations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "donorId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "donorWalletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "topic",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "industry",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "maxNumberOfApplications",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxNumberOfVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountDonatedInWei",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "applicationIsClosed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "votingIsClosed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allDonors",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "adjective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mainIndustryOfInterest",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allGrants",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "donationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "applicationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "applicantId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "applicantWalletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountGrantedInWei",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "voterId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "voterWalletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "donationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountRewardedInWei",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allVoteCountsOfApplicantsOfDonation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "allVoters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "adjective",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "countryOfResidence",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "voterId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "applicantId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "donationId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isRewarded",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isNotBlank",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "applicationsToDonations",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "checkIfApplicantExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "checkIfApplicantHasAlreadyMadeAnApplicationToDonation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_donorWalletAddress",
        "type": "address"
      }
    ],
    "name": "checkIfDonorExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "checkIfVoterExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "checkIfVoterHasAlreadyMadeAVoteInDonation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentApplicantId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentApplicationId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentDonationId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentDonorId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentGrantId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentRewardId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentVoteId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentVoterId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getAllApplicantsOfDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "countryOfResidence",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ageBracket",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Applicant[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getAllApplicationsOfDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "applicantWalletAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "pitchStatement",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Application[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllDonations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donorId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "donorWalletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "topic",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "industry",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "maxNumberOfApplications",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxNumberOfVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountDonatedInWei",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "applicationIsClosed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "votingIsClosed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Donation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_donorWalletAddress",
        "type": "address"
      }
    ],
    "name": "getAllDonationsCreatedByDonor",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donorId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "donorWalletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "topic",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "industry",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "maxNumberOfApplications",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxNumberOfVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountDonatedInWei",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "applicationIsClosed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "votingIsClosed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Donation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "getAllVotesOfVoter",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "voterId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isRewarded",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Vote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "getApplicantByWalletAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "countryOfResidence",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ageBracket",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Applicant",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      }
    ],
    "name": "getApplicantOfDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "countryOfResidence",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ageBracket",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Applicant",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      }
    ],
    "name": "getApplicationById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "applicantWalletAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "pitchStatement",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Application",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "getApplicationOfApplicantForDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "applicantWalletAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "pitchStatement",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Application",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "getApplicationsOfApplicant",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "applicantWalletAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "pitchStatement",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Application[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getDonationById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donorId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "donorWalletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "topic",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "industry",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "maxNumberOfApplications",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxNumberOfVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountDonatedInWei",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "applicationIsClosed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "votingIsClosed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Donation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_donorWalletAddress",
        "type": "address"
      }
    ],
    "name": "getDonorByWalletAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mainIndustryOfInterest",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Donor",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getGranteeOfDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "countryOfResidence",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ageBracket",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Applicant",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getLatestResultsOfDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "applicantWalletAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Result[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getPotentialAmountOfGrantOfDonationInWei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getPotentialAmountOfRewardOfDonationInWei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getPotentialAmountOfRewardToBekwest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "getTotalAmountOfGrantsGivenToApplicantInWei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_voterId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "getTotalAmountOfRewardsGivenToVoterInWei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getTotalAmountOfVotesForDonation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "getTotalAmountOfVotesMadeByVoter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_applicantWalletAddress",
        "type": "address"
      }
    ],
    "name": "getVoteCountOfApplicantOfDonation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "getVoteOfVoterForDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "voterId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donationId",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isRewarded",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Vote",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voterWalletAddress",
        "type": "address"
      }
    ],
    "name": "getVoterByWalletAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "countryOfResidence",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Voter",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_donationId",
        "type": "uint256"
      }
    ],
    "name": "getWinningApplicantOfDonation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "applicantId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "walletAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "adjective",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "countryOfResidence",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ageBracket",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isNotBlank",
            "type": "bool"
          }
        ],
        "internalType": "struct Applicant",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "granteesOfDonations",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "numbersOfApplicationsForDonations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "numbersOfApplicationsOfApplicants",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "numbersOfDonationsCreatedByDonors",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "numbersOfVotesForDonations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "numbersOfVotesOfVoters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "votingInDonation",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]