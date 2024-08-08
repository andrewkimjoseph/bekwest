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
import { Application } from "@/entities/application";
import { useAccount } from "wagmi";
import { getApplicationsOfApplicant } from "@/services/application/getAllApplicationsOfApplicant";
import { Donation } from "@/entities/donation";
import { getDonationById } from "@/services/donation/getDonationById";
import { getAllDonations } from "@/services/donation/getAllDonations";
import { parseWeiAmountToEther } from "@/utils/conversion/weiToEther";
export default function Home() {
  const [allApplicationsOfApplicant, setAllApplicationsOfApplicant] = useState<
    Application[]
  >([]);

  const [allDonations, setAllDonations] = useState<Donation[]>([]);


  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { applicantId } = router.query;

  useEffect(() => {
    const getAllApplicationsOfDonationAndSet = async () => {
      if (address) {
        const applicationsOfApplicant = await getApplicationsOfApplicant(
          address,
          { _applicantWalletAddress: address }
        );

        setAllApplicationsOfApplicant(applicationsOfApplicant);
      }
    };

    getAllApplicationsOfDonationAndSet();
  }, [address]);

  useEffect(() => {

    const getAndSetDonations = async () => {
      if (address) {
        const donations = await getAllDonations(address);
        setAllDonations(donations);
      }
    };

    getAndSetDonations();

  }, [address]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Applications Made</Text>

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
        {allApplicationsOfApplicant.map((application) => (
          <Box
            className="flex flex-row items-left items-center py-2 mx-4 relative"
            key={application.id}
          >
            <Card
              variant={"elevated"}
              borderRadius={12}
              w={"full"}
              onClick={() =>
                router.push(
                  `/applicant/${applicantId}/applications-made/${application.donationId}?donationId=${application.donationId}`
                )
              }
            >
              <CardBody p={3}>
                <Box className="flex flex-row items-left items-center relative">
                  <Avatar
                    name={`Application ${application.id}`}
                    size="lg"
                    bgColor={"#EB3C7F"}
                  />

                  <Box className="flex flex-col items-left relative ml-4">
                    <Text fontSize={16} mb={2}>
                      Donation Topic: {allDonations[allApplicationsOfApplicant.indexOf(application)]?.topic ?? ""}
                    </Text>
                    <Text fontSize={14} mb={2}>
                      Amount Made/to Make: {parseWeiAmountToEther(allDonations[allApplicationsOfApplicant?.indexOf(application)]?.amountDonatedInWei) * 0.75} cUSD
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
