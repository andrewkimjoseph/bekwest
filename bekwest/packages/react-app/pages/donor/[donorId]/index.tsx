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
  Spinner,
} from "@chakra-ui/react";

import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router from "next/router";
import { Donor } from "@/entities/donor";
import { useAccount } from "wagmi";
import { checkIfDonorExists } from "@/services/donor/checkIfDonorExists";
import { getDonorByWalletAddress } from "@/services/donor/getDonorByWalletAddress";
import { Donation } from "@/entities/donation";
import { getAllDonationsCreatedByDonor } from "@/services/donation/getAllDonationsCreatedByDonor";
import { parseWeiAmountToEther } from "@/utils/conversion/weiToEther";
export default function DonorHome() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [totalAmountDonated, setTotalAmountDonated] = useState(0);

  const [allDonationsCreatedByDonor, setAllDonationsCreatedByDonor] = useState<
    Donation[]
  >([]);

  const [donor, setDonor] = useState<Donor | null>(null);

  useEffect(() => {
    const checkIfDonorExistsAndSetFn = async () => {
      if (address) {
        const donorIsFound = await checkIfDonorExists(address);

        if (donorIsFound) {
          const donor = await getDonorByWalletAddress(address, {
            _donorWalletAddress: address,
          });
          setDonor(donor);
        }
      }
    };

    const getAllDonationsCreatedByDonorAndSet = async () => {
      if (address) {
        const donationsCreatedByDonor = await getAllDonationsCreatedByDonor(
          address,
          { _donorWalletAddress: address }
        );

        setAllDonationsCreatedByDonor(donationsCreatedByDonor);
      }
    };

    const getTotalAmountOfDonationsCreatedSet = () => {
      const amount = parseWeiAmountToEther(
        allDonationsCreatedByDonor.reduce(
          (runningTotal, currentDonation) =>
            runningTotal + currentDonation.amountDonatedInWei,
          0
        )
      );

      setTotalAmountDonated(amount);

      return 0;
    };

    checkIfDonorExistsAndSetFn();
    getAllDonationsCreatedByDonorAndSet();
    getTotalAmountOfDonationsCreatedSet();
  }, [address]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col justify-center h-screen items-center mb-24">
        <Spinner />
      </div>
    );
  }

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Welcome, {donor?.adjective}</Text>

        <CheckCircleIcon color={"#EB3C7F"} ml={2} boxSize={6} />

        <Spacer></Spacer>
        <ArrowBackIcon
          color={"#EB3C7F"}
          onClick={() => router.back()}
          boxSize={6}
        />
      </Box>

      <Box px={4}>
        <Divider borderColor="black" />
      </Box>

      <Box className="flex flex-row items-left items-center py-2 mx-4 mt-4 relative">
        <Text fontSize={20} mr={4}>
          Donation(s) Created:
        </Text>
        {/* <Spacer></Spacer> */}
        <Text fontWeight={"bold"} fontSize={"20"}>
          {allDonationsCreatedByDonor.length}
        </Text>
      </Box>

      <Box className="flex flex-row items-left items-center py-2 mx-4 mb-4 relative">
        <Text fontSize={20} mr={4}>
          Amount Donated:{" "}
        </Text>
        {/* <Spacer></Spacer> */}
        <Text fontWeight={"bold"} fontSize={"20"}>
          {totalAmountDonated} cUSD
        </Text>
      </Box>

      <Box px={4}>
        <Divider borderColor="black" />
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={22} mb={2}>
          Created Donations
        </Text>
      </Box>

      <Box overflowY="auto">
        {allDonationsCreatedByDonor.length === 0 ? (
          <Box w={"full"} px={4} className="flex flex-col" mt={4}>
            <Card variant={"outlined"} borderRadius={12} w={"full"}>
              <CardBody p={3}>
                <Box className="flex flex-row items-left items-center relative">
                  <Text fontSize={16}>No donations found.</Text>
                </Box>
              </CardBody>
            </Card>
          </Box>
        ) : (
          allDonationsCreatedByDonor.map((donation) => (
            <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
              <Card
                variant={"elevated"}
                borderRadius={12}
                w={"full"}
                onClick={() => router.push("/donor/1/donations/1")}
              >
                <CardBody p={3}>
                  <Box className="flex flex-row items-left items-center relative">
                    <Avatar
                      name="Sasuke Uchiha"
                      size="lg"
                      bgColor={"#EB3C7F"}
                    />

                    <Box className="flex flex-col items-left relative ml-4">
                      <Text fontSize={20} mb={2}>
                        Topic: Climate change
                      </Text>
                      <Text fontSize={20} mb={2}>
                        Amount: 5
                      </Text>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          ))
        )}
      </Box>

      <Box px={4} mt={6} mb={24} className="w-full">
        <Button
          w={"full"}
          onClick={() => router.push(`/donor/${donor?.id}/create-donation`)}
          boxShadow="base"
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create donation
        </Button>
      </Box>
    </Box>
  );
}

function setDonorExists(donorIsFound: boolean) {
  throw new Error("Function not implemented.");
}
