"use client";

import {
  Box,
  Button,
  Text,
  Spacer,
  Divider,
  Card,
  CardBody,
  Avatar,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Application } from "@/entities/application";
import { getAllApplicationsOfDonation } from "@/services/donation/getAllApplicationsOfDonation";
import { getDonationById } from "@/services/donation/getDonationById";
import { Donation } from "@/entities/donation";
import { makeAVote } from "@/services/voter/makeAVote";
import toast, { Toaster } from "react-hot-toast";
import { checkIfVoterHasAlreadyMadeAVoteInDonation } from "@/services/voter/checkIfVoterHasAlreadyMadeAVoteInDonation";
export default function VoteInParticularDonation() {
  const { address, isConnected } = useAccount();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [voterHasAlreadyMadeVote, setVoterHasAlreadyMadeVote] = useState(false);

  const [allApplicationsOfDonation, setAllApplicationsOfDonation] = useState<
    Application[]
  >([]);

  const [isMakingAVote, setIsMakingAVote] = useState<boolean[]>([]);

  const router = useRouter();
  const { voterId, donationId } = router.query;

  const makeAVoteFn = async (
    applicationId: number,
    applicantWalletAddress: `0x${string}`,
    index: number
  ) => {
    setIsMakingAVote((prevState) =>
      prevState.map((item, i) => (i === index ? true : item))
    );

    const donationIsCreated = await makeAVote(address, {
      _donationId: Number(donationId),
      _applicationId: applicationId,
      _applicantWalletAddress: applicantWalletAddress,
      _voterWalletAddress: address as `0x${string}`,
    });

    if (donationIsCreated) {
      toast.success("Vote made successful");

      router.push(`/voter/${voterId}`);
    } else {
      toast.error("Vote making failed");
    }
    setIsMakingAVote((prevState) =>
      prevState.map((item, i) => (i === index ? false : item))
    );
  };

  useEffect(() => {
    const getAndSetDonation = async () => {
      if (address) {
        const donation = await getDonationById(address, {
          _donationId: Number(donationId),
        });
        setDonation(donation);
      }
    };

    const getAllApplicationsOfDonationAndSet = async () => {
      if (address) {
        const applicationsOfDonation = await getAllApplicationsOfDonation(
          address,
          { _donationId: Number(donationId) }
        );

        setAllApplicationsOfDonation(applicationsOfDonation);
      }
    };

    const checkIfAlreadyVotedSet = async () => {
      if (address) {
        const hadAlreadyVoted = await checkIfVoterHasAlreadyMadeAVoteInDonation(
          address,
          {
            _donationId: Number(donationId),
            _voterWalletAddress: address,
          }
        );

        setVoterHasAlreadyMadeVote(hadAlreadyVoted);
      }
    };

    getAndSetDonation();
    checkIfAlreadyVotedSet();
    getAllApplicationsOfDonationAndSet();
  }, [address]);

  useEffect(() => {
    const setIsMakingVotes = async () => {
      setIsMakingAVote(new Array(allApplicationsOfDonation.length).fill(false));
    };

    setIsMakingVotes();
  }, [allApplicationsOfDonation]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Toaster />
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Donation {donation?.id}: Applications</Text>

        <Spacer></Spacer>
        <ArrowBackIcon
          color={"#EB3C7F"}
          onClick={() => router.back()}
          boxSize={6}
        />
      </Box>

      <Box px={4} mb={2}>
        <Divider borderColor="black" />
      </Box>

      <Box overflowY="auto">
        {allApplicationsOfDonation.length === 0 ? (
          <Box w={"full"} px={4} className="flex flex-col" mt={4}>
            <Card variant={"outlined"} borderRadius={12} w={"full"}>
              <CardBody p={3}>
                <Box className="flex flex-row items-left items-center relative">
                  <Text fontSize={16}>No applications found.</Text>
                </Box>
              </CardBody>
            </Card>
          </Box>
        ) : (
          allApplicationsOfDonation.map((application) => (
            <Box className="flex flex-col" key={application.id}>
              <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
                <Card variant={"elevated"} borderRadius={12} w={"full"}>
                  <CardBody>
                    <Box className="flex flex-row items-left items-center relative">
                      <Avatar
                        name={`Applicant ${application.applicantId}`}
                        size="lg"
                        bgColor={"#EB3C7F"}
                        boxSize={14}
                      />

                      <Box className="flex flex-col items-left relative ml-4">
                        <Text fontSize={20} mb={2}>
                          Topic: {donation?.topic}
                        </Text>
                      </Box>
                    </Box>

                    <Text fontSize={16} my={3}>
                      {application.pitchStatement}
                    </Text>
                    <Button
                      mt={2}
                      w={"full"}
                      onClick={() =>
                        makeAVoteFn(
                          application.id,
                          application.applicantWalletAddress,
                          allApplicationsOfDonation.indexOf(application)
                        )
                      }
                      isDisabled={voterHasAlreadyMadeVote}
                      isLoading={
                        isMakingAVote[
                          allApplicationsOfDonation.indexOf(application)
                        ]
                      }
                      loadingText="Voting for application"
                      borderRadius={"10"}
                      bgColor={"#EB3C7F"}
                      textColor={"white"}
                      _hover={{
                        bgColor: "#1E1E49",
                        textColor: "white",
                      }}
                    >
                      {voterHasAlreadyMadeVote
                        ? "Already voted in this donation"
                        : "Vote for this application"}
                    </Button>
                  </CardBody>
                </Card>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
