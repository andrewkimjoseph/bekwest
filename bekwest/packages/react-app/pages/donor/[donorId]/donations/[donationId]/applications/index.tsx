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
import { Application } from "@/entities/application";
import { getAllApplicationsOfDonation } from "@/services/donation/getAllApplicationsOfDonation";
export default function ParticularDonation() {
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { donorId, donationId, applicationId } = router.query;


  const [allApplicationsOfDonation, setAllApplicationsOfDonation] = useState<
    Application[]
  >([]);

  useEffect(() => {
    const getAllApplicationsOfDonationAndSet = async () => {
      if (address) {
        const applicationsOfDonation = await getAllApplicationsOfDonation(
          address,
          { _donationId: Number(donationId) }
        );

        setAllApplicationsOfDonation(applicationsOfDonation);
      }
    };

    getAllApplicationsOfDonationAndSet();
  }, [address]);


  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Donation {donationId}: Applications</Text>

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
            <Box
              className="flex flex-row items-left items-center py-2 mx-4 relative"
              key={application.id}
            >
              <Card
                variant={"elevated"}
                borderRadius={12}
                w={"full"}
                onClick={() =>
                  router.push(`/donor/${donorId}/donations/${donationId}/applications/${application.id}`)
                }
              >
                <CardBody>
                  <Box className="flex flex-row items-left items-center relative">
                    {/* <Avatar
                          name="Sasuke Uchiha"
                          size="lg"
                          bgColor={"#EB3C7F"}
                        /> */}

                    <CheckCircleIcon
                      color={"#EB3C7F"}
                      onClick={() => router.back()}
                      boxSize={14}
                    />

                    <Box className="flex flex-col items-left relative ml-4">
                      <Text fontSize={20} mb={2}>
                        Pitch statement:
                      </Text>
                      <Text fontSize={16} mb={2}>
                        {application.pitchStatement}
                      </Text>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
