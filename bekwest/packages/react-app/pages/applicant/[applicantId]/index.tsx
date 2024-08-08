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
import { getAllDonations } from "@/services/donation/getAllDonations";
import { Donation } from "@/entities/donation";
import { getApplicationsOfApplicant } from "@/services/application/getAllApplicationsOfApplicant";
import { Application } from "@/entities/application";
import { parseWeiAmountToEther } from "@/utils/conversion/weiToEther";
import { Applicant } from "@/entities/applicant";
import { getApplicantByWalletAddress } from "@/services/applicant/getApplicantByWalletAddress";
import { getTotalAmountOfGrantsGivenToApplicantInWei } from "@/services/applicant/getTotalAmountOfGrantsGivenToApplicantInWei";
export default function ApplicantHome() {
  const { address, isConnected } = useAccount();
  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [applicant, setApplicant] = useState<Applicant | null>(null);

  const [totalAmountGranted, setTotalAmountGranted] = useState(0);

  const [allApplicationsOfApplicant, setAllApplicationsOfApplicant] = useState<
    Application[]
  >([]);

  const router = useRouter();
  const { applicantId } = router.query;

  useEffect(() => {
    const getAndSetApplicant = async () => {
      if (address) {
        const fetchedApplicant = await getApplicantByWalletAddress(address, {
          _applicantWalletAddress: address,
        });

        setApplicant(fetchedApplicant);
      }
    };

    const getAllDonationsAndSet = async () => {
      if (address) {
        const allDonations = await getAllDonations(address);

        setAllDonations(allDonations);
      }
    };

    const getAllApplicationsOfDonationAndSet = async () => {
      if (address) {
        const applicationsOfApplicant = await getApplicationsOfApplicant(
          address,
          { _applicantWalletAddress: address }
        );

        setAllApplicationsOfApplicant(applicationsOfApplicant);
      }
    };

    const getTotalAmountOfGrantsGivenToApplicantInWeiAndSet = async () => {
      if (address) {
        const amount = await getTotalAmountOfGrantsGivenToApplicantInWei(
          address,
          { _applicantWalletAddress: address }
        );
        setTotalAmountGranted(amount);
      }
    };
    getAndSetApplicant();
    getAllDonationsAndSet();
    getAllApplicationsOfDonationAndSet();
    getTotalAmountOfGrantsGivenToApplicantInWeiAndSet();
  }, [address]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Welcome, {applicant?.adjective}</Text>

        <CheckCircleIcon color={"#1E1E49"} ml={2} boxSize={6} />

        <Spacer></Spacer>
        <ArrowBackIcon
          color={"#EB3C7F"}
          onClick={() => router.back()}
          boxSize={6}
        />
      </Box>

      <Box px={4} className="w-full">
        <Button
          w={"full"}
          boxShadow="base"
          loadingText="Creating your donor account"
          onClick={() => router.push(`/applicant/${applicantId}/applications-made`)}

          // ?amountGrantedInWei=${donation.amountDonatedInWei}
          borderRadius={"10"}
          bgColor={"#1E1E49"}
          textColor={"white"}
          _hover={{
            bgColor: "#EB3C7F ",
            textColor: "white",
          }}
        >
          <Text fontSize={18}>
            Check applications made ({allApplicationsOfApplicant.length})
          </Text>
        </Button>
      </Box>

      <Box className="flex flex-row items-left items-center py-2 mx-4 mt-4 relative">
        <Text fontSize={20} mr={2}>
          Total Granted So Far:
        </Text>
        <Text fontWeight={"bold"} fontSize={"20"}>
          {totalAmountGranted} cUSD
        </Text>
      </Box>

      <Box px={4}>
        <Divider borderColor="black" />
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={22} mb={2}>
          Open Donations
        </Text>
      </Box>

      <Box overflowY="auto">
        {allDonations.length === 0 ? (
          <Box w={"full"} px={4} className="flex flex-col" mt={4}>
            <Card variant={"outlined"} borderRadius={12} w={"full"}>
              <CardBody p={3}>
                <Box className="flex flex-row items-left items-center relative">
                  <Text fontSize={16}>No open donations found.</Text>
                </Box>
              </CardBody>
            </Card>
          </Box>
        ) : (
          allDonations.map((donation) => (
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
                    `/applicant/${applicantId}/open-donations/${donation?.id}`
                  )
                }
              >
                <CardBody p={3}>
                  <Box className="flex flex-row items-left items-center relative">
                    <Avatar
                      name={`Donation ${donation.id}`}
                      size="lg"
                      textColor={"white"}
                      bgColor={"#EB3C7F"}
                    />

                    <Box className="flex flex-col items-left relative ml-4">
                      <Text fontSize={16} mb={2}>
                        Topic: {donation.topic}
                      </Text>
                      <Text fontSize={14} mb={2}>
                        Gross Grant Amount:{" "}
                        {parseWeiAmountToEther(donation.amountDonatedInWei)}{" "}
                        cUSD
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
