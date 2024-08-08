"use client";

import {
  Box,
  Button,
  Select,
  Text,
  Spacer,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import toast, { Toaster } from "react-hot-toast";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router from "next/router";
import { useAccount } from "wagmi";
import { createDonorAccount } from "@/services/donor/createDonorAccount";
import { Donor } from "@/entities/donor";
import { checkIfDonorExists } from "@/services/donor/checkIfDonorExists";
import { getDonorByWalletAddress } from "@/services/donor/getDonorByWalletAddress";
export default function CreateAccountDonor() {
  const [adjective, setAdjective] = useState("Smart");
  const [mainIndustryOfInterest, setMainIndustryOfInterest] =
    useState("Education");
  const [isMounted, setIsMounted] = useState(false);

  const [isCreatingDonorAccount, setIsCreatingDonorAccount] = useState(false);

  const { address, isConnected } = useAccount();

  const createDonorAccountFn = async () => {
    setIsCreatingDonorAccount(true);

    const donorIsCreated = await createDonorAccount(address, {
      _donorWalletAddress: address as `0x${string}`,
      _adjective: adjective,
      _mainIndustryOfInterest: mainIndustryOfInterest,
    });

    if (donorIsCreated) {
      toast.success("Account creation successful");

      const donor = await getDonorByWalletAddress(address, {
        _donorWalletAddress: address as `0x${string}`,
      });
      console.log(donor);

      router.push(`/donor/${donor?.id}`);
    } else {
      toast.error("Account creation failed");
    }
    setIsCreatingDonorAccount(false);
  };

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
      <Toaster />

      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Donor Account Creation</Text>
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
          Pick any adjective you like
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={adjective}
          onChange={(event) => {
            setAdjective(event.target.value);
          }}
        >
          <option value="Smart">Smart</option>
          <option value="Humble">Humble</option>
          <option value="Powerful">Powerful</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Main industry of interest
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={mainIndustryOfInterest}
          onChange={(event) => {
            setMainIndustryOfInterest(event.target.value);
          }}
        >
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Climate">Climate</option>
        </Select>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          isLoading={isCreatingDonorAccount}
          loadingText="Creating your donor account"
          onClick={() => createDonorAccountFn()}
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create your donor account
        </Button>
      </Box>
    </Box>
  );
}
