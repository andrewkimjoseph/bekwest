"use client";

import {
  Box,
  Button,
  Select,
  Text,
  Spacer,
  Divider,
  Card,
  CardBody,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";

import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Voter } from "@/entities/voter";
import { getVoterByWalletAddress } from "@/services/voter/getVoterByWalletAddress";
import { Donation } from "@/entities/donation";
import { Vote } from "@/entities/vote";
import { getAllDonations } from "@/services/donation/getAllDonations";
import { getTotalAmountOfVotesMadeByVoter } from "@/services/voter/getTotalAmountOfVotesMadeByVoter";
import { getTotalAmountOfRewardsGivenToVoterInWei } from "@/services/voter/getTotalAmountOfRewardsGivenToVoterInWei";
import { parseWeiAmountToEther } from "@/utils/conversion/weiToEther";
export default function Home() {
  const { address, isConnected } = useAccount();
  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [voter, setVoter] = useState<Voter | null>(null);

  const [totalAmountRewarded, setTotalAmountRewarded] = useState(0);

  const [totalAmountOfVotesMadeByVoter, setTotalAmountOfVotesMadeByVoter] =
    useState(0);

  const router = useRouter();
  const { voterId } = router.query;

  useEffect(() => {
    const getAndSetVoter = async () => {
      if (address) {
        const fetchedVoter = await getVoterByWalletAddress(address, {
          _voterWalletAddress: address,
        });

        setVoter(fetchedVoter);
      }
    };

    const getAllDonationsAndSet = async () => {
      if (address) {
        const allDonations = await getAllDonations(address);

        setAllDonations(allDonations);
      }
    };

    const getTotalAmountOfVotesMadeByVoterVotesOfVoterAndSet = async () => {
      if (address) {
        const votesMade = await getTotalAmountOfVotesMadeByVoter(address, {
          _voterWalletAddress: address,
        });

        setTotalAmountOfVotesMadeByVoter(votesMade);
      }
    };

    const getTotalAmountOfRewardsGivenToVoterInWeiAndSet = async () => {
      if (address) {
        const amount = await getTotalAmountOfRewardsGivenToVoterInWei(address, {
          _voterId: Number(voterId),
          _voterWalletAddress: address,
        });
        setTotalAmountRewarded(amount);
      }
    };
    getAndSetVoter();
    getAllDonationsAndSet();
    getTotalAmountOfVotesMadeByVoterVotesOfVoterAndSet();
    getTotalAmountOfRewardsGivenToVoterInWeiAndSet();
  }, [address]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Welcome, {voter?.adjective}!</Text>

        <CheckCircleIcon color={"#1E1E49"} ml={2} boxSize={6} />

        <Spacer></Spacer>
        <ArrowBackIcon
          color={"#EB3C7F"}
          onClick={() => router.back()}
          boxSize={6}
        />
      </Box>

      <Box px={4} className="w-full my-2">
        <Button
          w={"full"}
          boxShadow="base"
          onClick={() => router.push("/voter/1/votes-made")}
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#1E1E49"}
          textColor={"white"}
          _hover={{
            bgColor: "#EB3C7F ",
            textColor: "white",
          }}
        >
          <Text fontSize={18}>
            {" "}
            Check votes made ({totalAmountOfVotesMadeByVoter})
          </Text>
        </Button>
      </Box>

      <Box className="flex flex-row items-left items-center mx-4 mt-4 relative mb-4">
        <Text fontSize={20} mr={4}>
          Amount Rewarded:
        </Text>
        {/* <Spacer></Spacer> */}
        <Card variant={"outlined"} borderRadius={12} w={"full"}>
          <CardBody>
            <Text fontWeight={"bold"} fontSize={"20"}>
              {parseWeiAmountToEther(totalAmountRewarded)} cUSD
            </Text>
          </CardBody>
        </Card>
      </Box>

      <Box px={4}>
        <Divider borderColor="black" />
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={22} mb={2}>
          Votable Donations
        </Text>
      </Box>

      <Box overflowY="auto">
        {allDonations.map((donation) => (
          <Box
            className="flex flex-row items-left items-center py-2 mx-4 relative"
            key={donation.id}
          >
            <Card
              variant={"elevated"}
              borderRadius={12}
              w={"full"}
              onClick={() =>
                router.push(
                  `/voter/${voter?.id}/votable-donations/${donation.id}`
                )
              }
            >
              <CardBody p={3}>
                <Box className="flex flex-row items-left items-center relative">
                  <Avatar name="Sasuke Uchiha" size="lg" bgColor={"#EB3C7F"} />

                  <Box className="flex flex-col items-left relative ml-4">
                    <Text fontSize={18} mb={2}>
                      Topic: {donation.topic}
                    </Text>
                    <Text fontSize={14} mb={2}>
                      Gross Grant Amount:{" "}
                      {parseWeiAmountToEther(donation.amountDonatedInWei)} cUSD
                    </Text>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
