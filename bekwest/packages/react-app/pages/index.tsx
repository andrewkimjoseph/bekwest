"use client";

import { Applicant } from "@/entities/applicant";
import { Donor } from "@/entities/donor";
import { Voter } from "@/entities/voter";
import { checkIfApplicantExists } from "@/services/applicant/checkIfApplicantExists";
import { getApplicantByWalletAddress } from "@/services/applicant/getApplicantByWalletAddress";
import { checkIfDonorExists } from "@/services/donor/checkIfDonorExists";
import { getDonorByWalletAddress } from "@/services/donor/getDonorByWalletAddress";
import { checkIfVoterExists } from "@/services/voter/checkIfVoterExists";
import { getVoterByWalletAddress } from "@/services/voter/getVoterByWalletAddress";
import { Box, Image, Button, Select } from "@chakra-ui/react";
import router from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
export default function Home() {
  const [entitySelection, setEntitySelection] = useState("Donor");
  const { address, isConnected } = useAccount();

  const [donorExists, setDonorExists] = useState(false);
  const [applicantExists, setApplicantExists] = useState(false);
  const [voterExists, setVoterExists] = useState(false);

  const [donor, setDonor] = useState<Donor | null>(null);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [voter, setVoter] = useState<Voter | null>(null);

  useEffect(() => {
    const checkIfDonorExistsAndSetFn = async () => {
      if (address) {
        const donorIsFound = await checkIfDonorExists(address);

        if (donorIsFound) {
          setDonorExists(donorIsFound);
          const donor = await getDonorByWalletAddress(address, {
            _donorWalletAddress: address,
          });
          setDonor(donor);
        }
      }
    };

    const checkIfApplicantExistsAndSetFn = async () => {
      if (address) {
        const applicantIsFound = await checkIfApplicantExists(address);

        if (applicantIsFound) {
          setApplicantExists(applicantExists);
          const applicant = await getApplicantByWalletAddress(address, {
            _applicantWalletAddress: address,
          });
          setApplicant(applicant);
        }
      }
    };

    const checkIfVoterExistsAndSetFn = async () => {
      if (address) {
        const voterIsFound = await checkIfVoterExists(address);

        if (voterIsFound) {
          setVoterExists(voterExists);
          const voter = await getVoterByWalletAddress(address, {
            _voterWalletAddress: address,
          });
          setVoter(voter);
        }
      }
    };

    checkIfDonorExistsAndSetFn();
    checkIfApplicantExistsAndSetFn();
    checkIfVoterExistsAndSetFn();
  }, [address]);

  return (
    <Box className="flex flex-col  items-center h-svh" bgColor={"#E6E8FA"}>
      <Box boxSize="sm">
        <Image
          src="/feature.png"
          alt="Feature"
          objectFit="cover"
          className="w-full"
        />
      </Box>
      <Box w={"full"} px={4}>
        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={entitySelection}
          onChange={(event) => {
            setEntitySelection(event.target.value);
          }}
        >
          <option value="Donor">Donor</option>
          <option value="Applicant">Applicant</option>
          <option value="Voter">Voter</option>
        </Select>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          loadingText="Creating your participant account"
          onClick={() => {
            if (entitySelection.toLocaleLowerCase() === "donor") {
              if (donorExists) {
                router.push(`/donor/${donor?.id}`);
                return;
              } else {
                router.push(`/create-account/donor`);
                return;
              }
            }

            if (entitySelection.toLocaleLowerCase() === "applicant") {
              if (applicantExists) {
                router.push(`/applicant/${applicant?.id}`);
                return;
              } else {
                router.push(`/create-account/applicant`);
                return;
              }
            }

            if (entitySelection.toLocaleLowerCase() === "voter") {
              if (voterExists) {
                router.push(`/voter/${voter?.id}`);
                return;
              } else {
                router.push(`/create-account/voter`);
                return;
              }
            }
          }}
          borderRadius={"10"}
          bgColor={"#1E1E49"}
          textColor={"white"}
          _hover={{
            bgColor: "#EB3C7F",
            textColor: "white",
          }}
        >
          Continue as {entitySelection.toLowerCase()}
        </Button>
      </Box>
    </Box>
  );
}
