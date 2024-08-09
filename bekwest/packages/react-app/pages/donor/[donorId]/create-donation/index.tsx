"use client";

import {
  Box,
  Button,
  Select,
  Text,
  Spacer,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { createDonation } from "@/services/donation/createDonation";
import toast, { Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
export default function CreateDonation() {
  const [industry, setIndustry] = useState("Education");
  const [topic, setTopic] = useState("Finance");
  const [maximumNumberOfApplicants, setMaximumNumberOfApplicants] = useState(1);
  const [maximumNumberOfVoters, setMaximumNumberOfVoters] = useState(1);
  const [isCreatingDonation, setIsCreatingDonation] = useState(false);
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { donorId } = router.query;

  const [amountDonated, setAmountDonated] = useState(2);

  const createDonationFn = async () => {
    setIsCreatingDonation(true);

    const donationIsCreated = await createDonation(address, {
      _donorId: Number(donorId),
      _donorWalletAddress: address as `0x${string}`,
      _topic: topic,
      _industry: industry,
      _maxNumberOfApplications: maximumNumberOfApplicants,
      _maxNumberOfVotes: maximumNumberOfVoters,
      _amountDonated: amountDonated,
    });

    if (donationIsCreated) {
      toast.success("Donation creation successful");

      router.push(`/donor/${donorId}`);
    } else {
      toast.error("Donation creation failed");
    }
    setIsCreatingDonation(false);
  };

  const labelStyles = {
    mt: "4",
    // fontSize: "sm",
  };

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Toaster />
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Donation Creation Form Creation</Text>
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
        <Text fontSize={16} mb={2}>
          Industry
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={industry}
          onChange={(event) => {
            setIndustry(event.target.value);
          }}
        >
          <option value="Education">Education</option>
          <option value="Agriculture">Agriculture</option>
          <option value="ICT">ICT</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Topic
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={topic}
          onChange={(event) => {
            setTopic(event.target.value);
          }}
        >
          <option value="Law">Law</option>
          <option value="Economics">Economics</option>
          <option value="Finance">Finance</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Maximum number of applicants
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={maximumNumberOfApplicants}
          onChange={(event) => {
            setMaximumNumberOfApplicants(Number(event.target.value));
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Maximum number of voters
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={maximumNumberOfVoters}
          onChange={(event) => {
            setMaximumNumberOfVoters(Number(event.target.value));
          }}
        >
          <option value="1">1</option>
          <option value="3">3</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={4}>
          Amount (cUSD)
        </Text>
        <Slider
          aria-label="slider-ex-6"
          onChange={(amount) => setAmountDonated(amount)}
          min={1}
          max={3}
          colorScheme="pink"
        >
          <SliderMark value={1} {...labelStyles}>
            1
          </SliderMark>
          <SliderMark value={2} {...labelStyles}>
            2
          </SliderMark>
          <SliderMark value={3} {...labelStyles}>
            3
          </SliderMark>
          <SliderMark
            value={amountDonated}
            textAlign="center"
            bg="#EB3C7F"
            color="white"
            mt="-10"
            ml={-1}
            w="4"
          >
            {amountDonated}
          </SliderMark>
          <SliderTrack bg="pink.100">
            <SliderFilledTrack bg="#1E1E49" />
          </SliderTrack>
          <SliderThumb bg={"#EB3C7F"} />
        </Slider>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          isLoading={isCreatingDonation}
          onClick={() => createDonationFn()}
          loadingText="Creating your donation"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create your donation
        </Button>
      </Box>
    </Box>
  );
}
