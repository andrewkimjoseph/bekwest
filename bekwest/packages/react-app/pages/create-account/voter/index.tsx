"use client";

import { Box, Button, Select, Text, Spacer, Divider } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import router from "next/router";
import { useAccount } from "wagmi";
import { createVoterAccount } from "@/services/voter/createVoterAccount";
import toast, { Toaster } from "react-hot-toast";
import { getVoterByWalletAddress } from "@/services/voter/getVoterByWalletAddress";
export default function Home() {
  const [adjective, setAdjective] = useState("Fierce");
  const [gender, setGender] = useState("Male");
  const [countryOfResidence, setCountryOfResidence] = useState("Kenya");
  const { address, isConnected } = useAccount();

  const [isCreatingVotingAccount, setIsCreatingVotingAccount] = useState(false);

  const createApplicantAccountFn = async () => {
    setIsCreatingVotingAccount(true);

    const voterIsCreated = await createVoterAccount(address, {
      _voterWalletAddress: address as `0x${string}`,
      _adjective: adjective,
      _gender: gender,
      _countryOfResidence: countryOfResidence,
    });

    if (voterIsCreated) {
      toast.success("Account creation successful");

      const voter = await getVoterByWalletAddress(address, {
        _voterWalletAddress: address as `0x${string}`,
      });
      console.log(voter);

      router.push(`/voter/${voter?.id}`);
    } else {
      toast.error("Account creation failed");
    }
    setIsCreatingVotingAccount(false);
  };

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Toaster />
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Voter Account Creation</Text>
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
          <option value="Funny">Funny</option>
          <option value="Focused">Focused</option>
          <option value="Serious">Serious</option>
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

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          isLoading={isCreatingVotingAccount}
          onClick={() => createApplicantAccountFn()}
          loadingText="Creating your voter account"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create your voter account
        </Button>
      </Box>
    </Box>
  );
}
