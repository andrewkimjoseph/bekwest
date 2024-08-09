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
import { useAccount } from "wagmi";
import { Donation } from "@/entities/donation";
import { getDonationById } from "@/services/donation/getDonationById";
import { parseWeiAmountToEther } from "@/utils/conversion/weiToEther";
import { makeApplication } from "@/services/application/makeApplication";
import toast, { Toaster } from "react-hot-toast";
import { checkIfApplicantHasAlreadyMadeAnApplicationToDonation } from "@/services/donation/checkIfApplicantHasAlreadyMadeAnApplicationToDonation";
export default function ParticularOpenDonation() {
  const { address, isConnected } = useAccount();

  const [pitchStatement, setPitchStatement] = useState(
    "Help me make Africa better."
  );
  const router = useRouter();
  const { applicantId, donationId } = router.query;
  const [isMakingApplication, setIsMakingApplication] = useState(false);
  const [
    applicantHasAlreadyMadeApplication,
    setApplicantHasAlreadyMadeApplication,
  ] = useState(false);

  const [netGrantAmount, setNetGrantAmount] = useState(0);

  const [donation, setDonation] = useState<Donation | null>(null);

  const makeApplicationFn = async () => {
    setIsMakingApplication(true);

    const applicationIsMade = await makeApplication(address, {
      _donationId: Number(donationId),
      _applicantId: Number(applicantId),
      _applicantWalletAddress: address as `0x${string}`,
      _pitchStatement: pitchStatement,
    });

    if (applicationIsMade) {
      toast.success("Application made successfully");
      router.push(`/applicant/${applicantId}`);
    } else {
      toast.error("Application making failed");
    }
    setIsMakingApplication(false);
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

    const getAndSetNetGrantAmount = async () => {
      if (address && donation) {
        setNetGrantAmount(
          parseWeiAmountToEther(donation.amountDonatedInWei * 0.75)
        );
      }
    };

    const checkIfAppliedAndSet = async () => {
      if (address) {
        const hasApplied =
          await checkIfApplicantHasAlreadyMadeAnApplicationToDonation(address, {
            _donationId: Number(donationId),
            _applicantWalletAddress: address,
          });

        setApplicantHasAlreadyMadeApplication(hasApplied);
      }
    };

    getAndSetNetGrantAmount();
    getAndSetDonation();
    checkIfAppliedAndSet();
  }, [address, donation]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Toaster />
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Donation {donationId}: About</Text>
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
        <Text fontSize={16}>Topic</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={3}>
            <Text fontSize={16}>{donation?.topic}</Text>
          </CardBody>
        </Card>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Net Grant Amount</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={3}>
            <Text fontSize={14}>{netGrantAmount} cUSD</Text>
          </CardBody>
        </Card>
      </Box>

      <Box px={4} py={3}>
        <Divider borderColor="black" />
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={1}>
        <Text fontSize={16} mb={2}>
          Select pitch statement
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={pitchStatement}
          onChange={(event) => {
            setPitchStatement(event.target.value);
          }}
        >
          <option value="You can trust me to deliver.">
            You can trust me to deliver.
          </option>
          <option value="I will give back to the society.">
            I will give back to the society.
          </option>
          <option value="You will not regret it.">
            You will not regret it.
          </option>
          <option value="Help me make Africa better.">
            Help me make Africa better.
          </option>
          <option value="Thank you for your good heart.">
            Thank you for your good heart.
          </option>
        </Select>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          isDisabled={applicantHasAlreadyMadeApplication}
          isLoading={isMakingApplication}
          onClick={() => makeApplicationFn()}
          loadingText="Making your application"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
       
        >
          {`${
            applicantHasAlreadyMadeApplication
              ? "Already applied"
              : "Make application"
          }`}
        </Button>
      </Box>
    </Box>
  );
}
