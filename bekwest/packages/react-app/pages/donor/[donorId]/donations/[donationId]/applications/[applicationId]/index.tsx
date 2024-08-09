"use client";

import {
  Box,
  Button,
  Select,
  Text,
  Spacer,
  Divider,
  Avatar,
  Card,
  CardBody,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { Application } from "@/entities/application";
import { Applicant } from "@/entities/applicant";
import { useAccount } from "wagmi";
import { getApplicationById } from "@/services/application/getApplicationById";
import { getApplicantByWalletAddress } from "@/services/applicant/getApplicantByWalletAddress";
import { approveApplication } from "@/services/application/approveApplication";
import toast, { Toaster } from "react-hot-toast";
export default function ApproveApplication() {
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { donorId, donationId, applicationId } = router.query;

  const [application, setApplication] = useState<Application | null>(null);

  const [applicant, setApplicant] = useState<Applicant | null>(null);

  const [isApprovingApplication, setIsApprovingApplication] = useState(false);


  const appoveApplicationFn = async () => {
    setIsApprovingApplication(true);

    const applicationIsApproved = await approveApplication(address, {
      _applicationId: Number(applicationId),

      _donationId: Number(donationId),

    });

    if (applicationIsApproved) {
      toast.success("Application approved successfully");
      router.push(`/donor/${donorId}`);
    } else {
      toast.error("Application approval failed");
    }
    setIsApprovingApplication(false);
  };


  useEffect(() => {
    const getApplicantAndApplicationAndSet = async () => {
      if (address) {
        const application = await getApplicationById(address, {
          _applicationId: Number(applicationId),
        });

        if (application) {
          setApplication(application);

          const applicant = await getApplicantByWalletAddress(address, {
            _applicantWalletAddress: application.applicantWalletAddress,
          });

          if (applicant) {
            setApplicant(applicant);
          }
        }
      }
    };

    getApplicantAndApplicationAndSet();
  }, [address]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Toaster />
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>
          Donation {donationId}: Application {applicationId}
        </Text>
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
      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Applicant Age Bracket</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={3}>
            <Text fontSize={16}>{applicant?.ageBracket} years</Text>
          </CardBody>
        </Card>
      </Box>
      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Applicant Country of Residence</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={3}>
            <Text fontSize={16}>{applicant?.countryOfResidence}</Text>
          </CardBody>
        </Card>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Pitch statement for Donation 1</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={3}>
            <Text fontSize={16}>{application?.pitchStatement}</Text>
          </CardBody>
        </Card>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          isDisabled={application?.isApproved}
          isLoading={isApprovingApplication}
          onClick={() => appoveApplicationFn()}
          loadingText="Approving application"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          {application?.isApproved? "Application approved":"Approve application"}
        </Button>
      </Box>
    </Box>
  );
}
