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

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router from "next/router";
import { useAccount } from "wagmi";
import { createApplicantAccount } from "@/services/applicant/createApplicantAccount";
import { getApplicantByWalletAddress } from "@/services/applicant/getApplicantByWalletAddress";
import toast, { Toaster } from "react-hot-toast";
export default function Home() {
  const [adjective, setAdjective] = useState("Fierce");
  const [gender, setGender] = useState("Male");
  const [countryOfResidence, setCountryOfResidence] = useState("Kenya");
  const [ageBracket, setAgeBracket] = useState("18 - 22");

  const [isMounted, setIsMounted] = useState(false);

  const [isCreatingApplicantAccount, setIsCreatingApplicantAccount] =
    useState(false);

  const { address, isConnected } = useAccount();

  const createApplicantAccountFn = async () => {
    setIsCreatingApplicantAccount(true);

    const applicantIsCreated = await createApplicantAccount(address, {
      _applicantWalletAddress: address as `0x${string}`,
      _adjective: adjective,
      _gender: gender,
      _countryOfResidence: countryOfResidence,
      _ageBracket: ageBracket,
    });

    if (applicantIsCreated) {
      toast.success("Account creation successful");

      const applicant = await getApplicantByWalletAddress(address, {
        _applicantWalletAddress: address as `0x${string}`,
      });
      console.log(applicant);

      router.push(`/applicant/${applicant?.id}`);
    } else {
      toast.error("Account creation failed");
    }
    setIsCreatingApplicantAccount(false);
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
        <Text fontSize={20}>Applicant Account Creation</Text>
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
          <option value="Fierce">Fierce</option>
          <option value="Ambitious">Ambitious</option>
          <option value="Amazing">Amazing</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Your Gender
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Country of Residence
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={countryOfResidence}
          onChange={(event) => {
            setCountryOfResidence(event.target.value);
          }}
        >
          <option value="Kenya">Kenya</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Uganda">Uganda</option>
          <option value="South Africa">South Africa</option>
          <option value="Ghana">Ghana</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Age Bracket
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
            value={ageBracket}
            onChange={(event) => {
              setAdjective(event.target.value);
            }}
        >
          <option value="Under 18">Under 18</option>
          <option value="18 - 22">18 - 22</option>
          <option value="23 - 27">23 - 27</option>
          <option value="28 - 32">28 - 32</option>
          <option value="Over 32">Over 32</option>
        </Select>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          onClick={() => createApplicantAccountFn()}
          isLoading={isCreatingApplicantAccount}
          loadingText="Creating your applicant account"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create your applicant account
        </Button>
      </Box>
    </Box>
  );
}
