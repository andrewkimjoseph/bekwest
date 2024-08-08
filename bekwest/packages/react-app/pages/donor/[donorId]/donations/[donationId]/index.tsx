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
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { Donation } from "@/entities/donation";
import { useAccount } from "wagmi";
import { getDonationById } from "@/services/donation/getDonationById";
import { Application } from "@/entities/application";
import { getAllApplicantsOfDonation } from "@/services/donation/getAllApplicantsOfDonation";
import { getAllApplicationsOfDonation } from "@/services/donation/getAllApplicationsOfDonation";

export default function ParticularDonation() {
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { donorId, donationId } = router.query;
  const [donation, setDonation] = useState<Donation | null>(null);

  const [allApplicationsOfDonation, setAllApplicationsOfDonation] = useState<
    Application[]
  >([]);

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

    getAndSetDonation();
    getAllApplicationsOfDonationAndSet();
  }, [address]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
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

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Topic</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>
              {donation?.topic}
            </Text>
          </CardBody>
        </Card>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Maximum Number of Applications</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>
              {donation?.maxNumberOfApplications}
            </Text>
          </CardBody>
        </Card>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Current Number Of Applications</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>
              {allApplicationsOfDonation.length}
            </Text>
          </CardBody>
        </Card>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          onClick={() =>
            router.push(
              `/donor/${donorId}/donations/${donationId}/applications`
            )
          }
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#1E1E49"}
          textColor={"white"}
          _hover={{
            bgColor: "#EB3C7F",
            textColor: "white",
          }}
        >
          View applications
        </Button>
      </Box>
    </Box>
  );
}
