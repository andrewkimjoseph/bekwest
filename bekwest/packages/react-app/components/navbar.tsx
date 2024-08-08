"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Fade,
  ScaleFade,
  Slide,
  Collapse,
  Circle,
  Spinner,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import LogoLink from "./logoLink";
import { BekwestLogo } from "./logo";
import NavLink from "./navLink";
import { checkIfVoterExists } from "@/services/voter/checkIfVoterExists";
import { checkIfDonorExists } from "@/services/donor/checkIfDonorExists";
import { checkIfApplicantExists } from "@/services/applicant/checkIfApplicantExists";
import { Donor } from "@/entities/donor";
import { Applicant } from "@/entities/applicant";
import { Voter } from "@/entities/voter";
import { getDonorByWalletAddress } from "@/services/donor/getDonorByWalletAddress";
import { getApplicantByWalletAddress } from "@/services/applicant/getApplicantByWalletAddress";
import { getVoterByWalletAddress } from "@/services/voter/getVoterByWalletAddress";

export default function BekwestNavbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  const [isMounted, setIsMounted] = useState(false);

  const [isMiniPay, setIsMiniPay] = useState(false);

  const [donorExists, setDonorExists] = useState(false);
  const [applicantExists, setApplicantExists] = useState(false);
  const [voterExists, setVoterExists] = useState(false);

  const [donor, setDonor] = useState<Donor | null>(null);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [voter, setVoter] = useState<Voter | null>(null);

  const links = [
    {
      title: "Onboarding",
      href: "/",
    },
    {
      title: "Donor View",
      href: donorExists? `/donor/${donor?.id}` : "/create-account/donor"
    },
    {
      title: "Applicant View",
      href: applicantExists? `/applicant/${applicant?.id}`: "/create-account/applicant"
    },
    {
      title: "Voter View",
      href: voterExists? `/voter/${voter?.id}`: "/create-account/voter"
    },
  ];

  useEffect(() => {
    if (
      window.ethereum &&
      (window.ethereum.isMiniPay || window.ethereum.isMinipay)
    ) {
      setIsMiniPay(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
          setApplicantExists(applicantIsFound);
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
          setVoterExists(voterIsFound);
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

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return (
      <div className="flex flex-col justify-center h-screen items-center mb-24">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Box bg="#1E1E49" px={4} position="sticky" top="0" zIndex="1000">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            border={"1px solid black"}
            bgColor={"white"}
            color={"#1E1E49"}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon color={"black"} />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={onToggle}
          />
          <HStack spacing={4} alignItems={"center"}>
            {/* <Box>Stekcit BwC</Box> */}

            <LogoLink href="/">
              <BekwestLogo />
            </LogoLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) => (
                <NavLink href={link.href} key={links.indexOf(link)}>
                  {link.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {!isMiniPay ? (
              <ConnectButton
                chainStatus="none"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                label="Connect"
              />
            ) : (
              <Circle
                size="10px"
                bg={`${isConnected ? "#EB3C7F" : "#E6E8FA"}`}
                color="white"
              >
                {/* <PhoneIcon /> */}
              </Circle>
            )}
          </Flex>
        </Flex>
      </Box>

      {isOpen ? (
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box
            mt={16}
            pb={2}
            display={{ md: "none" }}
            className="flex flex-col w-full h-screen"
            bg="#1E1E49"
            px={2}
            py={4}
            // borderTopRadius={20}
          >
            <Stack as={"nav"} spacing={4}>
              {links.map((link) => (
                <NavLink href={link.href} key={links.indexOf(link)}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        </Slide>
      ) : // <Collapse in={isOpen} animateOpacity>

      // </Collapse>
      // <Fade in={isOpen}>

      null}
      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
